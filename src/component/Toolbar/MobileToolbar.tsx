import { useRef } from 'react';
import styles from '@/styles/Toolbar/MobileToolbar.module.css';

// component
import SidebarMobile from '../Sidebar/SidebarMobile';

function MobileToolbar() {

    const sidebarMobileRef = useRef<HTMLElement>(null);

    const onSidebarMenuOpen = () => {
        if (!sidebarMobileRef.current) {
            return;
        }

        sidebarMobileRef.current.style.transform = 'translateX(0)';
    }

    return (

        <>
            <section className={styles.container}>
                <div className={styles.wrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 28 28" version="1.1" onClick={onSidebarMenuOpen}>
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g transform="translate(-310.000000, -208.000000)" fill="#ff014f">
                                <path d="M328,232 L312,232 C310.896,232 310,232.896 310,234 C310,235.104 310.896,236 312,236 L328,236 C329.104,236 330,235.104 330,234 C330,232.896 329.104,232 328,232 L328,232 Z M336,224 L312,224 C310.896,224 310,224.896 310,226 C310,227.104 310.896,228 312,228 L336,228 C337.104,228 338,227.104 338,226 C338,224.896 337.104,224 336,224 L336,224 Z M312,220 L328,220 C329.104,220 330,219.104 330,218 C330,216.896 329.104,216 328,216 L312,216 C310.896,216 310,216.896 310,218 C310,219.104 310.896,220 312,220 L312,220 Z M312,212 L336,212 C337.104,212 338,211.104 338,210 C338,208.896 337.104,208 336,208 L312,208 C310.896,208 310,208.896 310,210 C310,211.104 310.896,212 312,212 L312,212 Z">
                                </path>
                            </g>
                        </g>
                    </svg>
                </div>
            </section>

            {/* sidebar mobile */}
            <SidebarMobile ref={sidebarMobileRef} />
        </>

    );
}

export default MobileToolbar;