import { ToDosAccess } from './todosAcess'
import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'
import { TodoUpdate } from '../models/TodoUpdate'

// TODO: Implement businessLogic

const toDosAccess = new ToDosAccess();
const attachmentUtils = new AttachmentUtils();

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    return toDosAccess.getUserToDos(userId);
}

export function createToDo(createTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {
    const todoId = uuid.v4()
    const s3BucketName = process.env.ATTACHMENT_S3_BUCKET
  
    return toDosAccess.createToDoItem({
      userId: userId,
      todoId: todoId,
      attachmentUrl: `https://${s3BucketName}.s3.amazonaws.com/${todoId}`,
      createdAt: new Date().getTime().toString(),
      done: false,
      ...createTodoRequest
    })
}

export function updateToDo(updateTodoRequest: UpdateTodoRequest, todoId: string, userId: string): Promise<TodoUpdate> {
    return toDosAccess.updateToDo(updateTodoRequest, todoId, userId)
}

export function deleteToDo(todoId: string, userId: string): Promise<string> {
    return toDosAccess.deleteToDo(todoId, userId)
}

export function createAttachmentPresignedUrl(todoId: string): Promise<string> {
    return attachmentUtils.generateUploadUrl(todoId)
}
