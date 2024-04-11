const { sources } = require('coc.nvim');
const path = require('path');

exports.activate = async ctx => {
	const emojiData = require(path.resolve(__dirname, 'emoji.json'));
	const source = {
		name: 'emoji-shortcodes',
		triggerOnly: true,
		doComplete: async function() {
			return {
				items: emojiData.map(e => ({
					word: e.description + ': ',
					abbr: `${e.character} ${e.description}`,
					menu: this.menu,
					filterText: e.description
				}))
			};
		}
	};

	const wechatEmojiData = require(path.resolve(__dirname, 'wechat.json'));
	const wechat_source = {
		name: 'wechat-emoji-shortcodes',
		triggerOnly: true,
		doComplete: async function() {
			return {
				items: wechatEmojiData.map(e => ({
					word: e,
					menu: this.menu,
				}))
			};
		}
	};

	ctx.subscriptions.push(sources.createSource(source), sources.createSource(wechat_source));
};
