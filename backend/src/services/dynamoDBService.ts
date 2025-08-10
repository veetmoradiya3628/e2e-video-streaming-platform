import { dynamoDB } from "../config/aws";

export const getAllItems = async (tableName: string) => {
  const params: any = {
    TableName: tableName,
  };
  let items: any[] = [];
  let data;
  do {
    data = await dynamoDB.scan(params).promise();
    items = items.concat(data.Items || []);
    params.ExclusiveStartKey = data.LastEvaluatedKey;
  } while (typeof data.LastEvaluatedKey !== "undefined");
  return items;
};

export const getPaginatedItems = async (
  tableName: string,
  limit: number,
  exclusiveStartKey?: Record<string, any>
) => {
  const params: any = {
    TableName: tableName,
    Limit: limit,
  };
  if (exclusiveStartKey) {
    params.ExclusiveStartKey = exclusiveStartKey;
  }
  const data = await dynamoDB.scan(params).promise();
  return {
    items: data.Items || [],
    lastEvaluatedKey: data.LastEvaluatedKey,
  };
};
