import { nanoid } from 'nanoid'

const winston = require('winston'),
  WinstonCloudWatch = require('winston-cloudwatch')

const logger = winston

if (process.env.ENV == "development") { //if development env then use console
  logger.add(new winston.transports.Console({
    json: true,
    colorize: true,
  }))
} else { //if production or staging use staging winston-aws
  logger.add(new WinstonCloudWatch({
    logGroupName: process.env.npm_package_name,
    logStreamName:  () => `${process.env.npm_package_name}-${new Date().toISOString().split('T')[0]}-${nanoid()}`,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: proess.env.AWS_SECRET_KEY,
    awsRegion: process.env.AWS_REGION,
    messageFormatter: (item) => `[${item.meta?.headers.x-request-id}] ${new Date().toISOString()} ${item.meta?.method} ${item.meta?.path} ${item.level}: ${item?.message}`
    }
  }));
}

module.exports = logger