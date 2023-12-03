export const TabTitle = (newTitle, state) => {
    const defaultTitle = 'Quick Ink Reserve';

    return state === true ? (newTitle !== undefined ? 
    document.title = newTitle + ' | ' + defaultTitle :
    document.title = defaultTitle) : document.title = newTitle;
}