const TelegmaApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')

const token ='6133361434:AAGAenFyYH3tjBMAhmJj-xoJ2154zIwB2qg'

const bot = new TelegmaApi(token, {polling: true})

const chats = {}


const startGame = async (chatID) => {
    await bot.sendMessage(chatID, "ну смотри лошара, я загадал число от 1 до 9, отгадывай")
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatID] = randomNumber
    await bot.sendMessage(chatID, 'отгадай', gameOptions)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'тут написанно привет лох'},
        {command: '/info', description: 'тут про твое имя'},
        {command: '/game', description: 'игра отгадай число от 1 до 9'}
    ])
    
    bot.on("message", async msg => {
        const name = msg.from.first_name
        const chatID = msg.chat.id
        const text = msg.text
        if(text === '/start'){
            await bot.sendSticker(chatID, 'https://chpic.su/_data/stickers/c/CatMemesPackUz/CatMemesPackUz_001.webp')
            if(name == "Nice"){
                return bot.sendMessage(chatID, "привет крутой утка")
            }
            else{
                return bot.sendMessage(chatID, "привет лох")
            }
        }
        if(text === '/info'){
            return bot.sendMessage(chatID, `ты лох с никнеймом ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if(text === '/game'){
            return startGame(chatID)
        }
        return bot.sendMessage(chatID, "пиши нормально чурка")
    })
    
    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatID = msg.message.chat.id
        if(data === '/again'){
            return startGame(chatID)
        }
        if(data == chats[chatID]){
            console.log(msg)
            return bot.sendMessage(chatID, `ты отгадал цифру ${chats[chatID]}`, againOptions)
        } 
        else{
            console.log(msg)
            return bot.sendMessage(chatID, `ты лошара, бот загадал цифру ${chats[chatID]}`, againOptions)
        }
    })

}

start()