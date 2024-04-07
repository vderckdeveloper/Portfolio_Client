import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Toolbar/Toolbar.module.css';

function Toolbar() {

    // search
    const [search, setSearch] = useState<string>(''); 
    const [isSearch, setIsSearch] = useState<boolean>(false); 


    const searchBarFrameRef = useRef<HTMLDivElement>(null); 
    const searchBarInputRef = useRef<HTMLInputElement>(null);

    // router
    const router = useRouter();

    function onSearch(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
        setIsSearch(true);
    }

    function onDelete() {
        if (!searchBarInputRef.current) {
            return;
        }

        searchBarInputRef.current.value = '';
        setSearch('');
        setIsSearch(false);
    }

    const onSearchSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            router.push(`/search/title?title=${search}`);
        }
    };


    // change search bar color
    useEffect(() => {
        if(!searchBarInputRef.current || !searchBarFrameRef.current) {
            return;
        }

        // store Ref.current to a variable to prevent memory leak
        const searchBarInputNode = searchBarInputRef.current;
        const searchBarFrameNode = searchBarFrameRef.current;

        if (searchBarInputNode) {
            searchBarInputNode.addEventListener("focus", () => {
                searchBarFrameNode.style.background = "white";
            });
            searchBarInputNode.addEventListener("blur", () => {
                searchBarFrameNode.style.background = '#efefef';
            });
        }

        return () => {
            if (searchBarInputNode) {
                searchBarInputNode.removeEventListener("focus", () => {
                    searchBarFrameNode.style.background = "white";
                });
                searchBarInputNode.removeEventListener("blur", () => {
                    searchBarFrameNode.style.background = "#efefef";
                });
            }
        };

    }, [searchBarInputRef, searchBarFrameRef]);

    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.searchBar} ref={searchBarFrameRef}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10.5" cy="10.5" r="6.5" stroke="#ABABAB" strokeWidth="1.5"></circle>
                        <path d="M15.5 15.5L20 20" stroke="#ABABAB" strokeWidth="1.5" strokeLinecap="round"></path>
                    </svg>
                    <input type='text' maxLength={30} placeholder="찾고싶은 지식을 입력해주세요." onChange={onSearch} onKeyDown={onSearchSubmit} ref={searchBarInputRef}></input>
                    {
                        isSearch
                        &&
                        <svg onClick={onDelete} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" fill="#D6D6D6"></circle>
                            <path d="M9 9l6 6M15 9l-6 6" stroke="#171717" strokeLinecap="round"></path>
                        </svg>
                    }

                </div>
            </div>
        </section>
    );
}

export default Toolbar;