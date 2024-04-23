import { useState, useEffect, useRef } from 'react';
import { Editor, EditorState, RichUtils, CompositeDecorator, ContentBlock, ContentState } from 'draft-js';

import styles from '@/styles/Admin/Dashboard/Blog/AdminBlogCreate.module.css';

/**
 * Finds link entities within a content block and applies a callback to each.
 * @param contentBlock - The block of content to be examined.
 * @param callback - The function to call with start and end indices of each link entity found.
 * @param contentState - The state of the content which may contain entities.
 */
function findLinkEntities(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

interface LinkProps {
    contentState: ContentState;
    entityKey: string;
    children: React.ReactNode;
}

const Link: React.FC<LinkProps> = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url}>
            {props.children}
        </a>
    );
};


function AdminBlogCreate() {

    // read only
    const [readOnly, setReadOnly] = useState(false);

    const decorator = new CompositeDecorator([
        {
            strategy: findLinkEntities,
            component: Link,
        }
    ]);

    const [editorState, setEditorState] = useState(
        EditorState.createEmpty(decorator)
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
    const onToggleInlineStyle = (e: React.MouseEvent, inlineStyle: string) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    }

    // toggle block types
    const onToggleBlockType = (e: React.MouseEvent, blockType: string) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    }

    // prompt for link
    const promptForLink = (e: React.MouseEvent) => {
        e.preventDefault();
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            const url = window.prompt('Enter the URL');
            if (url) {
                const contentState = editorState.getCurrentContent();
                const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url });
                const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
                const newEditorStateWithLink = RichUtils.toggleLink(
                    newEditorState,
                    newEditorState.getSelection(),
                    entityKey
                );
                setEditorState(newEditorStateWithLink);
                focusEditor();
            }
        }
    }

     // Define removeLink here
     const removeLink = (e: React.MouseEvent) => {
        e.preventDefault();
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            setEditorState(RichUtils.toggleLink(editorState, selection, null));
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
                <button onMouseDown={(e) => {onToggleInlineStyle(e,'BOLD') }}>Bold</button>
                <button onMouseDown={(e) => {onToggleInlineStyle(e,'ITALIC') }}>Italic</button>
                <button onMouseDown={(e) => {onToggleInlineStyle(e,'UNDERLINE') }}>Underline</button>
                <button onMouseDown={(e) => {onToggleInlineStyle(e,'STRIKETHROUGH') }}>STRIKETHROUGH</button>
                <button onMouseDown={(e) => {onToggleInlineStyle(e,'CODE') }}>CODE</button>
                <button onMouseDown={(e) => {onToggleBlockType(e,'header-one') }}>H1</button>
                <button onMouseDown={(e) => {onToggleBlockType(e,'header-two') }}>H2</button>
                <button onMouseDown={(e) => {onToggleBlockType(e,'header-three') }}>H3</button>
                <button onMouseDown={(e) => {onToggleBlockType(e,'header-four') }}>H4</button>
                <button onMouseDown={(e) => {onToggleBlockType(e,'header-five') }}>H5</button>
                <button onMouseDown={(e) => {onToggleBlockType(e,'header-six') }}>H6</button>
                <button onMouseDown={(e) => {onToggleBlockType(e,'unstyled') }}>Paragraph</button>
                <button onMouseDown={(e) => {onToggleBlockType(e, 'unordered-list-item') }}>unordered-list-item</button>
                <button onMouseDown={(e) => {onToggleBlockType(e,'ordered-list-item') }}>ordered-list-item</button>
                <button onMouseDown={(e) => {onToggleBlockType(e,'blockquote') }}>Blockquote</button>
                <button onMouseDown={(e) => {onToggleBlockType(e,'code-block') }}>code block</button>
                <button onMouseDown={promptForLink}>Add Link</button>
                <button onMouseDown={removeLink}>Remove Link</button>
                <button onMouseDown={() => setReadOnly(prevState => !prevState)}>Save</button>
            </div>
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                readOnly={readOnly}
            />
        </div>
    );
}

export default AdminBlogCreate;