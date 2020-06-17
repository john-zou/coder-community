// ** New post page
export const setImg = url => {
    return {
	type: 'IMG_LOAD',
	url: url
    };
}

export const npTitle = title => {
    return {
	type: 'NP_TITLE',
	title: title
    };
}

export const npText = txt => {
    return {
	type: 'NP_TXT',
	txt: txt
    };
}

export const setTag = tag => {
    return {
	type: 'TAG_LOAD',
	tag: tag
    };
}

export const delTag = () => {
    return {
	type: 'TAG_DEL'
    }
}

export const setPeople = person => {
    return {
	type: 'PEOPLE_SET',
	person: person
    };
}

// ** **
export const toggle = cho => {
    return {
	type: 'PAGE_SELECT',
	cho: cho
    };
}

export const load = txt => {
    return {
        type: 'MESS_INPUT',
        input: txt
    };
}

export const store = (tp, txt) => {
    return {
        type: tp, // 'MESS_ADD', 'MESS_CLEAR'
        newmess: txt
    };
}

export const display = cho => {
    return {
        type: 'MESS_DISPLAY',
        displayCho: cho
    };
}

export const clear = cho => {
    return {
	type: 'MESS_CLEAR',
	clearCho: cho
    };
}

