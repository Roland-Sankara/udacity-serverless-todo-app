# Serverless TODO

> This is simple TODO application built using AWS Lambda and Serverless framework.

### Functionality of the application

This application allows creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment. Each user only has access to TODO items that he/she has created.

### Tools used
- AWS Lambda
- AWS API Gateway
- AWS DynamoDB 
- AWS S3(Simple Storage Service)
- AWS Cloudwatch ( for logging )
- Serverless Framework: [http://serverless.com/](http://serverless.com/)

### Backend API Endpoints

- `GET`: https://jfmv65gxlf.execute-api.us-east-1.amazonaws.com/dev/todos
- `POST`: https://jfmv65gxlf.execute-api.us-east-1.amazonaws.com/dev/todos
- `PATCH`: https://jfmv65gxlf.execute-api.us-east-1.amazonaws.com/dev/todos/{todoId}
- `DELETE`: https://jfmv65gxlf.execute-api.us-east-1.amazonaws.com/dev/todos/{todoId}
- `POST`: https://jfmv65gxlf.execute-api.us-east-1.amazonaws.com/dev/todos/{todoId}/attachment

### Getting started:
- `Clone repo` - to your local development environment
- `Change directory (cd)` - into the client folder
- Run `npm install` command - this is to install dependencies for the frontend
- Spin up the frontend using the `npm start` command
