import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const REGION = process.env.AWS_REGION || "ca-central-1";

const client = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function writeBuybackClosedToDynamo(event: {
    pool_id: string;
    blocks_sold: string;
    close_deadline: string;
    timestamp: string;
}) {
    const command = new PutCommand({
        TableName: "LotusLaunchQueue",
        Item: {
            pool_id: event.pool_id,
            blocks_sold: event.blocks_sold,
            close_deadline: event.close_deadline,
            timestamp: event.timestamp
        }
    });

    try {
        await ddbDocClient.send(command);
        console.log(`✅ BuybackClosed written to DynamoDB for pool ${event.pool_id}`);
    } catch (error) {
        console.error("❌ Error writing BuybackClosed to DynamoDB:", error);
    }
    
}

const sqsClient = new SQSClient({ region: REGION });

export async function sendPoolSoldOutToSQS(poolId: string) {
    const command = new SendMessageCommand({
        QueueUrl: "https://sqs.ca-central-1.amazonaws.com/677276109493/LotusLaunch.fifo",
        MessageBody: JSON.stringify({ poolId }),
        MessageGroupId: poolId, // FIFO queues require this
        MessageDeduplicationId: `${poolId}-${Date.now()}`, // ensures uniqueness
    });

    try {
        await sqsClient.send(command);
        console.log(`✅ SQS message sent for PoolSoldOut: ${poolId}`);
    } catch (error) {
        console.error("❌ Error sending SQS message:", error);
    }
}
