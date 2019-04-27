import React, { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import Select from 'react-select';

const ColorsSizesComponent = props => {
    const [colors, setColors] = useState([
        {value: "aliceblue", label: "AliceBlue"},{value: "antiquewhite", label: "AntiqueWhite"},{value: "aqua", label: "Aqua"},{value: "aquamarine", label: "Aquamarine"},{value: "azure", label: "Azure"},{value: "beige", label: "Beige"},{value: "bisque", label: "Bisque"},{value: "black", label: "Black"},{value: "blanchedalmond", label: "BlanchedAlmond"},{value: "blue", label: "Blue"},{value: "blueviolet", label: "BlueViolet"},{value: "brown", label: "Brown"},{value: "burlywood", label: "BurlyWood"},{value: "cadetblue", label: "CadetBlue"},{value: "chartreuse", label: "Chartreuse"},{value: "chocolate", label: "Chocolate"},{value: "coral", label: "Coral"},{value: "cornflowerblue", label: "CornflowerBlue"},{value: "cornsilk", label: "Cornsilk"},{value: "crimson", label: "Crimson"},{value: "cyan", label: "Cyan"},{value: "darkblue", label: "DarkBlue"},{value: "darkcyan", label: "DarkCyan"},{value: "darkgoldenrod", label: "DarkGoldenRod"},{value: "darkgray", label: "DarkGray"},{value: "darkgrey", label: "DarkGrey"},{value: "darkgreen", label: "DarkGreen"},{value: "darkkhaki", label: "DarkKhaki"},{value: "darkmagenta", label: "DarkMagenta"},{value: "darkolivegreen", label: "DarkOliveGreen"},{value: "darkorange", label: "Darkorange"},{value: "darkorchid", label: "DarkOrchid"},{value: "darkred", label: "DarkRed"},{value: "darksalmon", label: "DarkSalmon"},{value: "darkseagreen", label: "DarkSeaGreen"},{value: "darkslateblue", label: "DarkSlateBlue"},{value: "darkslategray", label: "DarkSlateGray"},{value: "darkslategrey", label: "DarkSlateGrey"},{value: "darkturquoise", label: "DarkTurquoise"},{value: "darkviolet", label: "DarkViolet"},{value: "deeppink", label: "DeepPink"},{value: "deepskyblue", label: "DeepSkyBlue"},{value: "dimgray", label: "DimGray"},{value: "dimgrey", label: "DimGrey"},{value: "dodgerblue", label: "DodgerBlue"},{value: "firebrick", label: "FireBrick"},{value: "floralwhite", label: "FloralWhite"},{value: "forestgreen", label: "ForestGreen"},{value: "fuchsia", label: "Fuchsia"},{value: "gainsboro", label: "Gainsboro"},{value: "ghostwhite", label: "GhostWhite"},{value: "gold", label: "Gold"},{value: "goldenrod", label: "GoldenRod"},{value: "gray", label: "Gray"},{value: "grey", label: "Grey"},{value: "green", label: "Green"},{value: "greenyellow", label: "GreenYellow"},{value: "honeydew", label: "HoneyDew"},{value: "hotpink", label: "HotPink"},{value: "indianred", label: "IndianRed"},{value: "indigo", label: "Indigo"},{value: "ivory", label: "Ivory"},{value: "khaki", label: "Khaki"},{value: "lavender", label: "Lavender"},{value: "lavenderblush", label: "LavenderBlush"},{value: "lawngreen", label: "LawnGreen"},{value: "lemonchiffon", label: "LemonChiffon"},{value: "lightblue", label: "LightBlue"},{value: "lightcoral", label: "LightCoral"},{value: "lightcyan", label: "LightCyan"},{value: "lightgoldenrodyellow", label: "LightGoldenRodYellow"},{value: "lightgray", label: "LightGray"},{value: "lightgrey", label: "LightGrey"},{value: "lightgreen", label: "LightGreen"},{value: "lightpink", label: "LightPink"},{value: "lightsalmon", label: "LightSalmon"},{value: "lightseagreen", label: "LightSeaGreen"},{value: "lightskyblue", label: "LightSkyBlue"},{value: "lightslategray", label: "LightSlateGray"},{value: "lightslategrey", label: "LightSlateGrey"},{value: "lightsteelblue", label: "LightSteelBlue"},{value: "lightyellow", label: "LightYellow"},{value: "lime", label: "Lime"},{value: "limegreen", label: "LimeGreen"},{value: "linen", label: "Linen"},{value: "magenta", label: "Magenta"},{value: "maroon", label: "Maroon"},{value: "mediumaquamarine", label: "MediumAquaMarine"},{value: "mediumblue", label: "MediumBlue"},{value: "mediumorchid", label: "MediumOrchid"},{value: "mediumpurple", label: "MediumPurple"},{value: "mediumseagreen", label: "MediumSeaGreen"},{value: "mediumslateblue", label: "MediumSlateBlue"},{value: "mediumspringgreen", label: "MediumSpringGreen"},{value: "mediumturquoise", label: "MediumTurquoise"},{value: "mediumvioletred", label: "MediumVioletRed"},{value: "midnightblue", label: "MidnightBlue"},{value: "mintcream", label: "MintCream"},{value: "mistyrose", label: "MistyRose"},{value: "moccasin", label: "Moccasin"},{value: "navajowhite", label: "NavajoWhite"},{value: "navy", label: "Navy"},{value: "oldlace", label: "OldLace"},{value: "olive", label: "Olive"},{value: "olivedrab", label: "OliveDrab"},{value: "orange", label: "Orange"},{value: "orangered", label: "OrangeRed"},{value: "orchid", label: "Orchid"},{value: "palegoldenrod", label: "PaleGoldenRod"},{value: "palegreen", label: "PaleGreen"},{value: "paleturquoise", label: "PaleTurquoise"},{value: "palevioletred", label: "PaleVioletRed"},{value: "papayawhip", label: "PapayaWhip"},{value: "peachpuff", label: "PeachPuff"},{value: "peru", label: "Peru"},{value: "pink", label: "Pink"},{value: "plum", label: "Plum"},{value: "powderblue", label: "PowderBlue"},{value: "purple", label: "Purple"},{value: "red", label: "Red"},{value: "rosybrown", label: "RosyBrown"},{value: "royalblue", label: "RoyalBlue"},{value: "saddlebrown", label: "SaddleBrown"},{value: "salmon", label: "Salmon"},{value: "sandybrown", label: "SandyBrown"},{value: "seagreen", label: "SeaGreen"},{value: "seashell", label: "SeaShell"},{value: "sienna", label: "Sienna"},{value: "silver", label: "Silver"},{value: "skyblue", label: "SkyBlue"},{value: "slateblue", label: "SlateBlue"},{value: "slategray", label: "SlateGray"},{value: "slategrey", label: "SlateGrey"},{value: "snow", label: "Snow"},{value: "springgreen", label: "SpringGreen"},{value: "steelblue", label: "SteelBlue"},{value: "tan", label: "Tan"},{value: "teal", label: "Teal"},{value: "thistle", label: "Thistle"},{value: "tomato", label: "Tomato"},{value: "turquoise", label: "Turquoise"},{value: "violet", label: "Violet"},{value: "wheat", label: "Wheat"},{value: "white", label: "White"},{value: "whitesmoke", label: "WhiteSmoke"},{value: "yellow", label: "Yellow"},{value: "yellowgreen", label: "YellowGreen"}
    ]);

    const [sizes, setSizes] = useState([{value: 'XXS', label: 'XXS'},{value: 'XS', label: 'XS'},{value: 'S', label: 'S'},{value: 'M', label: 'M'},{value: 'L', label: 'L'},{value: 'XL', label: 'XL'},{value: '2XL', label: '2XL'},{value: '3XL', label: '3XL'},{value: '4XL', label: '4XL'},{value: '5XL', label: '5XL'}]);

    const dot = (color = '#111') => ({
        alignItems: 'center',
        display: 'flex',
      
        ':before': {
          backgroundColor: color,
          borderRadius: 15,
          content: '" "',
          display: 'block',
          marginRight: 8,
          height: 15,
          width: 15,
        },
    });
      
    const colourStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.value);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? null
                    : isSelected ? data.value : isFocused ? color.alpha(0.1).css() : null,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                    ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
                    : data.value,
                cursor: isDisabled ? 'not-allowed' : 'default',
            };
        },
        input: styles => ({ ...styles, ...dot() }),
        placeholder: styles => ({ ...styles, ...dot() }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.value) }),
        control: (base, state) => ({
            ...base,
            backgroundColor: 'transparent',
            borderColor: state.isFocused ?
            '#4f9ae6' : props.isValid ?
            '#4f9ae6' : 'red',
            '&:hover': {
            borderColor: state.isFocused ?
                '#4f9ae6' : props.isValid ?
                '#4f9ae6' : 'red'
            }
        })
    };

    const sizeStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: 'transparent',
            borderColor: state.isFocused ?
            '#4f9ae6' : props.isValid ?
            '#4f9ae6' : 'red',
            '&:hover': {
            borderColor: state.isFocused ?
                '#4f9ae6' : props.isValid ?
                '#4f9ae6' : 'red'
            }
        })
    }

    useEffect(() => {
        if(props.sizes) {
            const newSizes = [{value: 'XXS', label: 'XXS'},{value: 'XS', label: 'XS'},{value: 'S', label: 'S'},{value: 'M', label: 'M'},{value: 'L', label: 'L'},{value: 'XL', label: 'XL'},{value: '2XL', label: '2XL'},{value: '3XL', label: '3XL'},{value: '4XL', label: '4XL'},{value: '5XL', label: '5XL'}];
            props.choosenSizes.forEach(psize => {
                const findIndex = newSizes.findIndex(size => size.label === psize);
                if(findIndex !== -1) {
                    newSizes.splice(findIndex, 1);
                }
            });
            if(newSizes.length === 0) {
                props.setAllSizesSelected(true);
            }
            if(props.choosenSizes.length === 0) {
                props.setAllSizesSelected(false);
            }
            setSizes(newSizes);
        } 
    }, [props.choosenSizes])

    useEffect(() => {
        if(props.color) {
            const newColors = [...colors];
            props.choosenColors.forEach(pcolor => {
                const findIndex = newColors.findIndex(color => color.label === pcolor);
                if(findIndex !== -1) {
                    newColors.splice(findIndex, 1);
                }
            });
            setColors(newColors);
        } 
    }, [props.choosenColors])

    return (
        <div className="mb-20">
            {props.color && <Select options={colors} onChange={e => props.setColor(e.label)} styles={colourStyles} value={ props.value === false ? {label: 'Choose Color'} : { label: props.value, value: props.value.toLowerCase()} } required/>}
            {props.sizes && <Select options={sizes} onChange={e => props.setSize(e.label)} styles={sizeStyles} value={ props.value === false ? {label: 'Choose Size'} : { label: props.value } } required/>}
        </div>
    );
}

export default ColorsSizesComponent;