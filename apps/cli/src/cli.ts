#!/usr/bin/env node

import * as process from 'node:process'

import { Command } from 'commander'
import * as dotenv from 'dotenv'

import { add, generate } from './commands'

async function exec(): Promise<void> {
    dotenv.config()

    const program = new Command()

    program.addCommand(add).addCommand(generate)
    program
        .name('Dach')
        .description('Elegant project banners from your terminal')

    program.parse()
}

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

void exec()
