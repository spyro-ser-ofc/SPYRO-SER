const
	{
		WAConnection,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WA_MESSAGE_STUB_TYPES,
		ReconnectMode,
		ProxyAgent,
		GroupSettingChange,
		waChatKey,
		mentionedJid,
		processTime,
	} = require("@adiwajshing/baileys")
const moment = require("moment-timezone")
const fs = require("fs")
const color = require('./lib/color')

numbernye = '0'
fake = '*Dark Bot By Anker*'

module.exports = geps = async (dms, geps) => {
	try {
		const from = geps.key.remoteJid
		const messageStubType = WA_MESSAGE_STUB_TYPES[geps.messageStubType] || 'MESSAGE'
		const dataRevoke = JSON.parse(fs.readFileSync('./antidelete/gc-revoked.json'))
		const dataCtRevoke = JSON.parse(fs.readFileSync('./antidelete/ct-revoked.json'))
		const dataBanCtRevoke = JSON.parse(fs.readFileSync('./antidelete/ct-revoked-banlist.json'))
		const sender = geps.key.fromMe ? dms.user.jid : geps.key.remoteJid.endsWith('@g.us') ? geps.participant : geps.key.remoteJid
		const isRevoke = geps.key.remoteJid.endsWith('@s.whatsapp.net') ? true : geps.key.remoteJid.endsWith('@g.us') ? dataRevoke.includes(from) : false
		const isCtRevoke = geps.key.remoteJid.endsWith('@g.us') ? true : dataCtRevoke.data ? true : false
		const isBanCtRevoke = geps.key.remoteJid.endsWith('@g.us') ? true : !dataBanCtRevoke.includes(sender) ? true : false
		if (messageStubType == 'REVOKE') {
			console.log(`Status untuk grup : ${!isRevoke}\nStatus semua kontak : ${!isCtRevoke}\nStatus kontak dikecualikan : ${!isBanCtRevoke}`)
			if (!isRevoke) return
			if (!isCtRevoke) return
			if (!isBanCtRevoke) return
			const from = geps.key.remoteJid
			const isGroup = geps.key.remoteJid.endsWith('@g.us') ? true : false
			let int
			let infoMSG = JSON.parse(fs.readFileSync(`./antidelete/msg.data.json`))
			const id_deleted = geps.key.id
			const conts = geps.key.fromMe ? dms.user.jid : dms.contacts[sender] || { notify: jid.replace(/@.+/, '') }
			const pushname = geps.key.fromMe ? dms.user.name : conts.notify || conts.vname || conts.name || '-'
			const opt4tag = {
				contextInfo: { mentionedJid: [sender] }
			}
			for (let iii = 0; iii < infoMSG.length; iii++) {
				if (infoMSG[iii].key.id == id_deleted) {
					const dataInfo = infoMSG[iii]
					const type = Object.keys(infoMSG[iii].message)[0]
					const timestamp = infoMSG[iii].messageTimestamp
					int = {
						no: iii,
						type: type,
						timestamp: timestamp,
						data: dataInfo
					}
				}
			}
			const index = Number(int.no)
			const body = int.type == 'conversation' ? infoMSG[index].message.conversation : int.type == 'extendedTextMessage' ? infoMSG[index].message.extendedTextMessage.text : int.type == 'imageMessage' ? infoMSG[index].message.imageMessage.caption : int.type == 'stickerMessage' ? 'Sticker' : int.type == 'audioMessage' ? 'Audio' : int.type == 'videoMessage' ? infoMSG[index].videoMessage.caption : infoMSG[index]
			const mediaData = int.type === 'extendedTextMessage' ? JSON.parse(JSON.stringify(int.data).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : int.data
			var itsme = `${numbernye}@s.whatsapp.net`
			var split = `${fake}`
			// var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
			var selepbot72 = {
				contextInfo: {
					participant: itsme,
					quotedMessage: {
						extendedTextMessage: {
							text: split,
						}
					}
				}
			}
			if (int.type == 'conversation' || int.type == 'extendedTextMessage') {
				const strConversation = `「 *ANTI-DELETE* 」

• Nama: ${pushname}
• Number: @${sender.replace('@s.whatsapp.net', '')}
• Tipe: Text
• Waktu: ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
• Pesan: ${body ? body : '-'}
`
				dms.sendMessage(from, strConversation, MessageType.text, selepbot72)
			} else if (int.type == 'stickerMessage') {
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				const pingbro23 = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
				const savedFilename = await dms.downloadMediaMessage(int.data)
				fs.writeFileSync(`./antidelete/sticker/${filename}`, savedFilename)
				const strConversation = `「 *ANTI-DELETE* 」

• Nama: ${pushname}
• Number: @${sender.replace('@s.whatsapp.net', '')}
• Tipe: Sticker
• Waktu: ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
`

				const buff = fs.readFileSync(`./antidelete/sticker/${filename}`)
				dms.sendMessage(from, strConversation, MessageType.text, opt4tag)
				dms.sendMessage(from, buff, MessageType.sticker, pingbro23)
				// console.log(stdout)
				fs.unlinkSync(`./antidelete/sticker/${filename}`)

			} else if (int.type == 'imageMessage') {
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				const pingbro22 = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
				const savedFilename = await dms.downloadMediaMessage(int.data);
				fs.writeFileSync(`./antidelete/image/${filename}`, savedFilename)
				const buff = fs.readFileSync(`./antidelete/image/${filename}`)
				const strConversation = `「 *ANTI-DELETE* 」

• Nama: ${pushname}
• Number: @${sender.replace('@s.whatsapp.net', '')}
• Tipe: Image
• Waktu: ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
• Pesan: ${body ? body : '-'}\`\`\`
`
				dms.sendMessage(from, buff, MessageType.image, { contextInfo: { mentionedJid: [sender] }, caption: strConversation })
				fs.unlinkSync(`./antidelete/image/${filename}`)
			}
		}
	} catch (err) {
		console.log(color(`[ANTI DELETE]`, 'red') + err)
		//dms.sendMessage('6285158549166@s.whatsapp.net', `${err}`, MessageType.text)
		// console.log(e)
	}
}
