import Sidebar from "../Sidebar/Sidebar";
import MainBody from "./MainBody";
import styles from '@/styles/Main/Main.module.css';

function Main() {

    return (
        <section className={styles.wrapper}>
            <Sidebar />
            <MainBody />
        </section>
    );
}

export default Main;