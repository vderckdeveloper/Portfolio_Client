import styles from '@/styles/Notification/LineNotification.module.css';

interface LineNotificationProps {
    lineNotificationText: string
}

function LineNotification(props: LineNotificationProps) {

    const lineNotificationText = props.lineNotificationText;

    return (
        <div className={styles.wrapper}>
            <svg viewBox="-2.4 -2.4 28.80 28.80" width={25} height={25} fill="none" xmlns="http://www.w3.org/2000/svg">
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM10.5 7.5V12C10.5 12.8284 11.1716 13.5 12 13.5C12.8284 13.5 13.5 12.8284 13.5 12V7.5C13.5 6.67157 12.8284 6 12 6C11.1716 6 10.5 6.67157 10.5 7.5ZM12 18C12.8284 18 13.5 17.3284 13.5 16.5C13.5 15.6716 12.8284 15 12 15C11.1716 15 10.5 15.6716 10.5 16.5C10.5 17.3284 11.1716 18 12 18Z" fill="#007bff">
                    </path>
                </g>
            </svg>
            <p className={styles.paragraph}>{lineNotificationText}</p>
        </div>
    )
}

export default LineNotification;