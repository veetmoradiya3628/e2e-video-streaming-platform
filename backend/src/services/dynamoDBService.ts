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
