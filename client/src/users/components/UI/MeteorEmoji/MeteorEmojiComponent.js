import React, {  useRef, useState, useEffect } from 'react';

const MeteorEmojiComponent = props => {

    const containerRef = useRef();
    const [show,setShow] = useState(false);
    const [showFaces,setShowFaces] = useState(true);
    const [showTransport,setShowTransport] = useState(false);
    const [showObjects,setShowObjects] = useState(false);
    const [showAnimals,setShowAnimals] = useState(false);
    const [showFood,setShowFood] = useState(false);
    const [showSport,setShowSport] = useState(false);
    const [showSymbols,setShowSymbols] = useState(false);
    const [showFlags,setShowFlags] = useState(false);
    const [text, setText] = useState('');

    const transport = [
        "🚗","🚕","🚙","🚌","🚎","🏎️","🚓","🚑","🚒","🚐","🚚","🚛","🚜","🛴","🚲","🛵","🏍️","🚨","🚔","🚍","🚘","🚖","🚡","🚠","🚟","🚃","🚋","🚞","🚝","🚄","🚅","🚈","🚂","🚆","🚇","🚊","🚉","✈️","🛫","🛬","🛩️","💺","🧳","🛰️","🚀","🛸","🚁","🛶","⛵","🚤","🛥️","🛳️","⛴️","🚢","⚓","⛽","🚧","🚦","🚥","🚏","🗺️","🗿","🗽","🗼","🏰","🏯","🏟️","🎡","🎢","🎠","⛲","⛱️","🏖️","🏝️","🏜️","🌋","⛰️","🏔️","🗻","🏕️","⛺","🏠","🏡","🏘️","🏚️","🏗️","🏭","🏢","🏣","🏤","🏥","🏦","🏨","🏪","🏫","🏩","💒","🏛️","⛪","🕌","🕍","🕋","⛩️","🛤️","🛣️","🗾","🎑","🏞️","🌅","🌄","🌠","🎇","🎆","🧨","🌇","🌆","🏙️","🌃","🌌","🌉","🌁"
      ];
      
    const objects = [
    "⌚","📱","📲","💻","⌨️","🖥️","🖨️","🖱️","🖲️","🕹️","♟️","🧩","🗜️","💽","💾","💿","📀","📼","📷","📸","📹","🎥","📽️","🎞️","📞","☎️","📟","📠","📺","📻","🎙️","🎚️","🎛️","⏱️","⏲️","⏰","🕰️","⌛","⏳","📡","🧭","🔋","🔌","🧲","💡","🔦","🕯️","🧯","🗑️","🛢️","💸","💵","💴","💶","💷","💰","💳","💎","🧿","🧱","⚖️","🧰","🔧","🔨","⚒️","🛠️","⛏️","🔩","⚙️","⛓️","🔫","💣","🔪","🗡️","⚔️","🛡️","🚬","⚰️","⚱️","🏺","🔮","📿","💈","⚗️","🧪","🧫","🧬","🧮","🔭","🔬","🕳️","💊","💉","🌡️","🚽","🚰","🚿","🛁","🛀","🧹","🧺","🧻","🧼","🧽","🧴","🧵","🧶","🛎️","🔑","🗝️","🚪","🛋️","🛏️","🛌","🧸","🖼️","🛍️","🛒","🎁","🎈","🎏","🎀","🎊","🎉","🎎","🏮","🎐","🧧","✉️","📩","📨","📧","💌","📥","📤","📦","🏷️","📪","📫","📬","📭","📮","📯","📜","📃","📄","🧾","📑","📊","📈","📉","🗒️","🗓️","📆","📅","📇","🗃️","🗳️","🗄️","📋","📁","📂","🗂️","🗞️","📰","📓","📔","📒","📕","📗","📘","📙","📚","📖","🔖","🔗","📎","🖇️","📐","📏","🧷","📌","📍","✂️","🖊️","🖋️","✒️","🖌️","🖍️","📝","✏️","🔍","🔎","🔏","🔐","🔒","🔓"
    ];

    const faces = [
    "😀","😃","😄","😁","😆","😅","😂","🤣","☺️","😊","😇","🙂","🙃","😉","😌","😍","😘","🥰","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🤩","🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","😢","😭","😤","😠","😡","🤬","🤯","😳","😱","😨","😰","🥵","🥶","🥺","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","😴","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","☠️","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾","🤲","👐","🙌","👏","🤝","👍","👎","👊","✊","🤛","🤜","🤞","✌️","🤟","🤘","👌","👈","👉","👆","👇","☝️","✋","🤚","🖐️","🖖","👋","🤙","💪","🦵","🦶","🖕","✍️","🙏","💍","💄","💋","👄","👅","👂","👃","👣","👁️","👀","🧠","🦴","🦷","🗣️","👤","👥","👶","👧","🧒","👦","👩","🧑","👨","👱","👱‍♀️","👩‍🦰","👨‍🦰","👩‍🦱","👨‍🦱","👩‍🦳","👨‍🦳","👩‍🦲","👨‍🦲","🧔","👵","🧓","👴","👲","👳","👳‍♀️","🧕","👮","👮‍♀️","👷","👷‍♀️","💂","💂‍♀️","🕵️","🕵️‍♀️","👩‍⚕️","👨‍⚕️","👩‍🌾","👨‍🌾","👩‍🍳","👨‍🍳","👩‍🎓","👨‍🎓","👩‍🎤","👨‍🎤","👩‍🏫","👨‍🏫","👩‍🏭","👨‍🏭","👩‍💻","👨‍💻","👩‍💼","👨‍💼","👩‍🔧","👨‍🔧","👩‍🔬","👨‍🔬","👩‍🎨","👨‍🎨","👩‍🚒","👨‍🚒","👩‍✈️","👨‍✈️","👩‍⚖️","👨‍⚖️","👰","🤵","👸","🤴","🤶","🎅","🦸‍♀️","🦸‍♂️","🦹‍♀️","🦹‍♂️","🧙‍♀️","🧙‍♂️","🧝‍♀️","🧝‍♂️","🧛‍♀️","🧛‍♂️","🧟‍♀️","🧟‍♂️","🧞‍♀️","🧞‍♂️","🧜‍♀️","🧜‍♂️","🧚‍♀️","🧚‍♂️","👼","🤰","🤱","🙇","🙇‍♀️","💁","💁‍♂️","🙅","🙅‍♂️","🙆","🙆‍♂️","🙋","🙋‍♂️","🤦‍♀️","🤦‍♂️","🤷‍♀️","🤷‍♂️","🙎","🙎‍♂️","🙍","🙍‍♂️","💇","💇‍♂️","💆","💆‍♂️","🧖‍♀️","🧖‍♂️","💅","🤳","💃","🕺","👯","👯‍♂️","🕴️","🚶","🚶‍♀️","🏃","🏃‍♀️","👫","👭","👬","💑","👩‍❤️‍👩","👨‍❤️‍👨","💏","👩‍❤️‍💋‍👩","👨‍❤️‍💋‍👨","👪","👨‍👩‍👧","👨‍👩‍👧‍👦","👨‍👩‍👦‍👦","👨‍👩‍👧‍👧","👩‍👩‍👦","👩‍👩‍👧","👩‍👩‍👧‍👦","👩‍👩‍👦‍👦","👩‍👩‍👧‍👧","👨‍👨‍👦","👨‍👨‍👧","👨‍👨‍👧‍👦","👨‍👨‍👦‍👦","👨‍👨‍👧‍👧","👩‍👦","👩‍👧","👩‍👧‍👦","👩‍👦‍👦","👩‍👧‍👧","👨‍👦","👨‍👧","👨‍👧‍👦","👨‍👦‍👦","👨‍👧‍👧","🧥","👚","👕","👖","👔","👗","👙","👘","🥼","👠","👡","👢","👞","👟","🥾","🥿","🧦","🧤","🧣","🎩","🧢","👒","🎓","⛑️","👑","👝","👛","👜","💼","🎒","👓","🕶️","🥽","🌂"
    ];

    const animals = [
    "🐶","🐱","🐭","🐹","🐰","🦊","🦝","🐻","🐼","🦘","🦘","🐨","🐯","🦁","🐮","🐷","🐽","🐸","🐵","🙈","🙈","🙊","🐒","🐔","🐧","🐦","🐤","🐣","🐥","🦆","🦢","🦅","🦉","🦜","🦚","🦇","🐺","🐗","🐴","🦄","🐝","🐛","🦋","🐌","🐚","🐞","🐜","🦗","🕷️","🕸️","🦂","🦟","🦠","🐢","🐍","🦎","🦖","🦕","🐙","🦑","🦐","🦀","🦞","🐡","🐠","🐟","🐬","🐳","🐋","🦈","🐊","🐅","🐆","🦓","🦍","🐘","🦏","🦛","🐪","🐫","🦒","🦙","🐃","🐂","🐄","🐎","🐖","🐏","🐑","🐐","🦌","🐕","🐩","🐈","🐓","🦃","🕊️","🐇","🐁","🐀","🐿️","🦔","🐾","🐉","🐲","🌵","🎄","🌲","🌳","🌴","🌱","🌿","☘️","🍀","🎍","🎋","🍃","🍂","🍁","🍄","🌾","💐","🌷","🌹","🥀","🌺","🌸","🌼","🌻","🌞","🌝","🌛","🌜","🌚","🌕","🌖","🌗","🌘","🌑","🌒","🌓","🌔","🌙","🌎","🌍","🌏","💫","⭐","🌟","✨","⚡","☄️","💥","🔥","🌪️","🌈","☀️","🌤️","⛅","🌥️","☁️","🌦️","🌧️","⛈️","🌩️","🌨️","❄️","☃️","⛄","🌬️","💨","💧","💦","☔","☂️","🌊","🌫️"
    ];

    const food = [
    "🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🍈","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🍆","🥑","🥦","🥬","🥒","🌶️","🌽","🥕","🥔","🍠","🥐","🍞","🥖","🥨","🥯","🧀","🥚","🍳","🥞","🥓","🥩","🍗","🍖","🌭","🍔","🍟","🍕","🥪","🥙","🌮","🌯","🥗","🥘","🥫","🍝","🍜","🍲","🍛","🍣","🍱","🍤","🍙","🍚","🍘","🍥","🥠","🍢","🍡","🍧","🍨","🍦","🥧","🍰","🎂","🥮","🧁","🍮","🍭","🍬","🍫","🍿","🧂","🍩","🥟","🍪","🌰","🥜","🍯","🥛","🍼","☕","🍵","🥤","🍶","🍺","🍻","🥂","🍷","🥃","🍸","🍹","🍾","🥄","🍴","🍽️","🥣","🥡","🥢"
    ];

    const sport = [
    "⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉","🎱","🏓","🏸","🥅","🏒","🏑","🏏","🥍","⛳","🥏","🏹","🎣","🥊","🥋","🎽","🛹","⛸️","🥌","🛷","🎿","⛷️","🏂","🏋️","🏋️‍♀️","🤼‍♀️","🤼‍♂️","🤸‍♀️","🤸‍♂️","⛹️","⛹️‍♀️","🤺","🤾‍♀️","🤾‍♂️","🏌️","🏌️‍♀️","🏇","🧘‍♀️","🧘‍♂️","🏄","🏄‍♀️","🏊","🏊‍♀️","🤽‍♀️","🤽‍♂️","🚣","🚣‍♀️","🧗‍♀️","🧗‍♂️","🚵","🚵‍♀️","🚴","🚴‍♀️","🏆","🥇","🥈","🥉","🏅","🎖️","🏵️","🎗️","🎫","🎟️","🎪","🤹‍♀️","🤹‍♂️","🎭","🎨","🎬","🎤","🎧","🎼","🎹","🥁","🎷","🎺","🎸","🎻","🎲","🎯","🎳","🎮","90"
    ];

    const symbols = [
    "❤️","🧡","💛","💚","💙","💜","🖤","💔","❣️","💕","💞","💓","💗","💖","💘","💝","💟","☮️","✝️","☪️","☸️","✡️","🔯","🕎","☯️","☦️","🛐","⛎","♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓","⚛️","♾️","☢️","☣️","✴️","🆚","💮","🅰️","🅱️","🆎","🅾️","🆘","❌","⭕","🛑","⛔","📛","🚫","💯","💢","♨️","🚷","🚯","🚳","🚱","🔞","📵","🚭","❗","❕","❓","❔","‼️","⁉️","🔅","🔆","〽️","⚠️","🚸","🔱","⚜️","♻️","✅","❇️","✳️","❎","🌐","💠","🌀","💤","🏧","🚾","♿","🛂","🛃","🛄","🛅","🚹","🚺","🚼","🚻","🚮","🎦","📶","🆗","🆙","🆒","🆕","🆓","🎵","🎶","💲","➰","➿","🔚","🔙","🔛","🔝","🔜","⚪","⚫","🔴","🔵","🔈","🔇","🔉","🔊","🔔","🔕","📣","📢","👁️‍🗨️","💬","💭"
    ];

    const flags = [
    '🏳️','🏴','🏁','🚩','🏳️‍🌈','🏴‍☠️','🇦🇫','🇦🇽','🇦🇱','🇩🇿','🇦🇸','🇦🇩','🇦🇴','🇦🇮','🇦🇶','🇦🇬','🇦🇷','🇦🇲','🇦🇼','🇦🇺','🇦🇹','🇦🇿','🇧🇸','🇧🇭','🇧🇩','🇧🇧','🇧🇾','🇧🇪','🇧🇿','🇧🇯','🇧🇲','🇧🇹','🇧🇴','🇧🇦','🇧🇼','🇧🇷','🇮🇴','🇻🇬','🇧🇳','🇧🇬','🇧🇫','🇧🇮','🇰🇭','🇨🇲','🇨🇦','🇮🇨','🇨🇻','🇧🇶','🇰🇾','🇨🇫','🇹🇩','🇨🇱','🇨🇳','🇨🇽','🇨🇨','🇨🇴','🇰🇲','🇨🇬','🇨🇩','🇨🇰','🇨🇷','🇨🇮','🇭🇷','🇨🇺','🇨🇼','🇨🇾','🇨🇿','🇩🇰','🇩🇯','🇩🇲','🇩🇴','🇪🇨','🇪🇬','🇸🇻','🇬🇶','🇪🇷','🇪🇪','🇪🇹','🇪🇺','🇫🇰','🇫🇴','🇫🇯','🇫🇮','🇫🇷','🇬🇫','🇵🇫','🇹🇫','🇬🇦','🇬🇲','🇬🇪','🇩🇪','🇬🇭','🇬🇮','🇬🇷','🇬🇱','🇬🇩','🇬🇵','🇬🇺','🇬🇹','🇬🇬','🇬🇳','🇬🇼','🇬🇾','🇭🇹','🇭🇳','🇭🇰','🇭🇺','🇮🇸','🇮🇳','🇮🇩','🇮🇷','🇮🇶','🇮🇪','🇮🇲','🇮🇱','🇮🇹','🇯🇲','🇯🇵','🎌','🇯🇪','🇯🇴','🇰🇿','🇰🇪','🇰🇮','🇽🇰','🇰🇼','🇰🇬','🇱🇦','🇱🇻','🇱🇧','🇱🇸','🇱🇷','🇱🇾','🇱🇮','🇱🇹','🇱🇺','🇲🇴','🇲🇰','🇲🇬','🇲🇾','🇲🇻','🇲🇱','🇲🇹','🇲🇭','🇲🇶','🇲🇷','🇲🇺','🇾🇹','🇲🇽','🇫🇲','🇲🇩','🇲🇨','🇲🇳','🇲🇪','🇲🇸','🇲🇦','🇲🇿','🇲🇲','🇳🇦','🇳🇷','🇳🇵','🇳🇱','🇳🇨','🇳🇿','🇳🇮','🇳🇪','🇳🇬','🇳🇺','🇳🇫','🇰🇵','🇲🇵','🇳🇴','🇴🇲','🇵🇰','🇵🇼','🇵🇸','🇵🇦','🇵🇬','🇵🇾','🇵🇪','🇵🇭','🇵🇳','🇵🇱','🇵🇹','🇵🇷','🇶🇦','🇷🇪','🇷🇴','🇷🇺','🇷🇼','🇼🇸','🇸🇲','🇸🇹','🇸🇦','🇸🇳','🇷🇸','🇸🇨','🇸🇱','🇸🇬','🇸🇽','🇸🇰','🇸🇮','🇬🇸','🇸🇧','🇸🇴','🇿🇦','🇰🇷','🇸🇸','🇪🇸','🇱🇰','🇧🇱','🇸🇭','🇰🇳','🇱🇨','🇵🇲','🇻🇨','🇸🇩','🇸🇷','🇸🇿','🇸🇪','🇨🇭','🇸🇾','🇹🇼','🇹🇯','🇹🇿','🇹🇭','🇹🇱','🇹🇬','🇹🇰','🇹🇴','🇹🇹','🇹🇳','🇹🇷','🇹🇲','🇹🇨','🇻🇮','🇹🇻','🇺🇬','🇺🇦','🇦🇪','🇬🇧','🏴󠁧󠁢󠁥󠁮󠁧󠁿','🏴󠁧󠁢󠁳󠁣󠁴󠁿','🏴󠁧󠁢󠁷󠁬󠁳󠁿','🇺🇸','🇺🇾','🇺🇿','🇻🇺','🇻🇦','🇻🇪','🇻🇳','🇼🇫','🇪🇭','🇾🇪','🇿🇲','🇿🇼','🇦🇨','🇧🇻','🇨🇵','🇪🇦','🇩🇬','🇭🇲','🇲🇫','🇸🇯','🇹🇦','🇺🇲','🇺🇳'
    ];

    const clickLink = event => {
        event.preventDefault();
        let emoji = event.target.cloneNode(true),sel,range;
        
        if (window.getSelection) {
          sel = window.getSelection();
  
          if (sel.getRangeAt && sel.rangeCount) {
              range = sel.getRangeAt(0);
              range.deleteContents();
              const el = document.createElement("div");
              el.append(emoji)
              let frag = document.createDocumentFragment(), node, lastNode;
  
              while ( (node = el.firstChild) ) {lastNode = frag.appendChild(node);}
              range.insertNode(frag);
              // Preserve the selection
              if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
              }
              setText(text+lastNode.outerHTML);
          }
        }
    };
  
    const clickCategory = (event, category) => {
        event.preventDefault();
        setShowFaces(false);setShowTransport(false);setShowObjects(false);setShowAnimals(false);setShowFood(false);setShowSport(false);setShowSymbols(false);setShowFlags(false);
        category === 'faces' && setShowFaces(true); category === 'animals' && setShowAnimals(true); category === 'food' && setShowFood(true); category === 'sport' && setShowSport(true); category === 'transport' && setShowTransport(true); category === 'objects' && setShowObjects(true); category === 'symbols' && setShowSymbols(true); category === 'flags' && setShowFlags(true);
    };

    const trigerOnclick = e => {
        e.preventDefault();
            setShow(!show);
    }

    const changeDivContent = e => {
        setText(e.currentTarget.innerHTML)
        let sel,range;
            
        if (window.getSelection) {
            sel = window.getSelection();
            
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                var frag = document.createDocumentFragment(), node, lastNode;
                
                while ( (node = e.currentTarget.firstChild) ) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);
                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    // range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
                e.currentTarget.focus();
            }
        }
    }

    useEffect(() => {
        props.setReviewText(text);
    }, [text]);

    return (
        <div ref={containerRef} className="emojiContainer">
            <div 
                className="contenteditable" 
                contentEditable="true"
                onInput={changeDivContent}
                >
            </div>
            <a className="emojiTriger show" href='/' onClick={trigerOnclick}>t</a>
            <div className={show ? "emojiPicker show" : 'emojiPicker'} tabIndex="0">
                <ul className="category">
                    <a href='/' id="faces" className={showFaces ? "active" : ''} onClick={(e) => clickCategory(e, 'faces')}>a</a>
                    <a href='/' id="animals" className={showAnimals ? "active" : ''} onClick={(e) => clickCategory(e, 'animals')}>s</a>
                    <a href='/' id="food" className={showFood ? "active" : ''} onClick={(e) => clickCategory(e, 'food')}>d</a>
                    <a href='/' id="sport" className={showSport ? "active" : ''} onClick={(e) => clickCategory(e, 'sport')}>f</a>
                    <a href='/' id="transport" className={showTransport ? "active" : ''} onClick={(e) => clickCategory(e, 'transport')}>g</a>
                    <a href='/' id="objects" className={showObjects ? "active" : ''} onClick={(e) => clickCategory(e, 'objects')}>h</a>
                    <a href='/' id="symbols" className={showSymbols ? "active" : ''} onClick={(e) => clickCategory(e, 'symbols')}>j</a>
                    <a href='/' id="flags" className={showFlags ? "active" : ''} onClick={(e) => clickCategory(e, 'flags')}>k</a>
                </ul>
                <ul className={showFaces ? "faces n-c show" : 'faces n-c'}>
                    {faces.map((img, index) => 
                        <img className="emojiLink" 
                        key={index} alt={img} 
                        src={`/public/images/emojiSmile/${index+1}.png`} 
                        onClick={clickLink}/>
                    )}
                </ul>
                <ul className={showAnimals ? "animals n-c show" : 'animals n-c'}>
                    {animals.map((img, index) => 
                        <img className="emojiLink" 
                        key={index} alt={img} 
                        src={`/public/images/emojiAnimals/${index+1}.png`} 
                        onClick={clickLink}/>
                    )}
                </ul>
                <ul className={showFood ? "food n-c show" : 'food n-c'}>
                    {food.map((img, index) => 
                        <img className="emojiLink" 
                        key={index} alt={img} 
                        src={`/public/images/emojiFood/${index+1}.png`} 
                        onClick={clickLink}/>
                    )}
                </ul>
                <ul className={showSport ? "sport n-c show" : 'sport n-c'}>
                    {sport.map((img, index) => 
                        <img className="emojiLink" 
                        key={index} alt={img} 
                        src={`/public/images/emojiActivity/${index+1}.png`} 
                        onClick={clickLink}/>
                    )}
                </ul>
                <ul className={showTransport ? "transport n-c show" : 'transport n-c'}>
                    {transport.map((img, index) => 
                        <img className="emojiLink" 
                        key={index} alt={img} 
                        src={`/public/images/emojiTravel/${index+1}.png`} 
                        onClick={clickLink}/>
                    )}
                </ul>
                <ul className={showObjects ? "objects n-c show" : 'objects n-c'}>
                    {objects.map((img, index) => 
                        <img className="emojiLink" 
                        key={index} alt={img} 
                        src={`/public/images/emojiObjects/${index+1}.png`} 
                        onClick={clickLink}/>
                    )}
                </ul>
                <ul className={showSymbols ? "symbols n-c show" : 'symbols n-c'}>
                    {symbols.map((img, index) => 
                        <img className="emojiLink" 
                        key={index} alt={img} 
                        src={`/public/images/emojiSymbols/${index+1}.png`} 
                        onClick={clickLink}/>
                    )}
                </ul>
                <ul className={showFlags ? "flags n-c show" : 'flags n-c'}>
                    {flags.map((img, index) => 
                        <img className="emojiLink" 
                        key={index} alt={img} 
                        src={`/public/images/emojiFlags/${index+1}.png`} 
                        onClick={clickLink}/>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default MeteorEmojiComponent;