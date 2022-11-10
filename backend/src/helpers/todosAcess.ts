import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic

export class ToDosAccess {

    constructor(
      private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
      private readonly todoTable = process.env.TODOS_TABLE
    ) {}
  
    async getUserToDos(userId: string): Promise<TodoItem[]> {

      const queryOptions = {
        TableName: this.todoTable,
        KeyConditionExpression: '#userId = :userId',
        ExpressionAttributeNames: {
          '#userId': 'userId'
        },
        ExpressionAttributeValues: {
          ':userId': userId
        }
      }

      logger.info(`Fetching todos for user with userId: ${userId}...`)

      const result = await this.docClient.query(queryOptions).promise();

      logger.info(`Fetching result: ${result}...`)
  
      const items = result.Items

      logger.info(`Fetching todos complete!`)

      return items as TodoItem[]
    }
  
    async createToDoItem(todoItem: TodoItem): Promise<TodoItem> {
      const data = {
        TableName: this.todoTable,
        Item: todoItem
      }

      logger.info('Creating a new todo item...');

      await this.docClient.put(data).promise();

      logger.info('new todo created successfully')
  
      return todoItem as TodoItem
    }
  
    async updateToDo(todoUpdate: TodoUpdate, todoId: string, userId: string): Promise<TodoUpdate> {
      const updateOptions = {
        TableName: this.todoTable,
        Key: {
          userId: userId,
          todoId: todoId
        },
        UpdateExpression: 'set #todoName = :name, #todoDueDate = :dueDate, #todoDone = :done',
        ExpressionAttributeNames: {
          '#todoName': 'name',
          '#todoDueDate': 'dueDate',
          '#todoDone': 'done'
        },
        ExpressionAttributeValues: {
          ':name': todoUpdate['name'],
          ':dueDate': todoUpdate['dueDate'],
          ':done': todoUpdate['done']
        },
        ReturnValues: 'ALL_NEW'
      }
      logger.info('Updating toDo Item...');

      const result = await this.docClient.update(updateOptions).promise();

      logger.info('Successfully updated toDo Item record!', JSON.stringify(result));

      const attributes = result.Attributes
  
      return attributes as TodoUpdate
    }
  
    async deleteToDo(todoId: string, userId: string): Promise<string> {
      const params = {
        TableName: this.todoTable,
        Key: {
          userId: userId,
          todoId: todoId
        }
      }
      logger.info('Deleting toDo item...');

      const result = await this.docClient.delete(params).promise();

      logger.info('Successfully deleted toDo item', JSON.stringify(result))
  
      return '' as string
    }
}