import { useState, useEffect, useRef } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

import styles from '@/styles/Admin/Dashboard/Blog/AdminBlogCreate.module.css';

function AdminBlogCreate() {

    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    );

    const editor = useRef<Editor>(null);

    const focusEditor = () => {
        if (editor.current) {
            editor.current.focus();
        }
    }

    // Function to handle key command
    const handleKeyCommand = (command: string) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    // Toggle inline styles
    const onToggleInlineStyle = (inlineStyle: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    }

    // toggle block types
    const onToggleBlockType = (blockType: string) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    }

    // prompt for link
    const promptForLink = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const currentSelection = editorState.getSelection();
        if (!currentSelection.isCollapsed()) {
            const url = window.prompt('Enter the URL');
            if (url) {
                const contentState = editorState.getCurrentContent();
                const contentStateWithEntity = contentState.createEntity(
                    'LINK',
                    'MUTABLE',
                    { url }
                );
                const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
                const withLink = RichUtils.toggleLink(
                    newEditorState,
                    newEditorState.getSelection(),
                    entityKey
                );
                setEditorState(withLink);
            }
        } else {
            alert('Please select text where you want to apply the link.');
        }
    };

    // focus editor
    useEffect(() => {
        if (editor.current) {
            editor.current.focus();
        }
    }, []);

    return (
        <div className={styles.container} onClick={focusEditor}>
            <div className={styles.tool}>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleInlineStyle('BOLD') }}>Bold</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleInlineStyle('ITALIC') }}>Italic</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleInlineStyle('UNDERLINE') }}>Underline</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleInlineStyle('STRIKETHROUGH') }}>STRIKETHROUGH</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleInlineStyle('CODE') }}>CODE</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType('header-one') }}>H1</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType('header-two') }}>H2</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType('header-three') }}>H3</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType('header-four') }}>H4</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType('header-five') }}>H5</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType('header-six') }}>H6</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType('unstyled') }}>Paragraph</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType('unordered-list-item') }}>unordered-list-item</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType('ordered-list-item') }}>ordered-list-item</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType('blockquote') }}>Blockquote</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType('code-block') }}>code block</button>
                <button onMouseDown={promptForLink}>Link</button>

            </div>
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
            />
        </div>
    );
}

export default AdminBlogCreate;