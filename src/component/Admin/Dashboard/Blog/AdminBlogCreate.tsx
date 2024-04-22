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
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType('header-four') }}>H5</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType('header-four') }}>H6</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType('unordered-list-item') }}>unordered-list-item</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType('ordered-list-item') }}>ordered-list-item</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType('code-block') }}>code block</button>
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