import { useState, useRef } from "react";
import styles from '@/styles/Admin/Login/AdminLogin.module.css';

function AdminLogin() {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    // ref
    const submitButtonRef = useRef<HTMLButtonElement>(null);

    const onId = (event: React.ChangeEvent<HTMLInputElement>) => {
        // remove white space password
        const spaceRemovedInput = event.currentTarget.value.replace(/\s/g, '');
        setId(spaceRemovedInput);
    }

    const onPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        // remove white space password
        const spaceRemovedInput = event.currentTarget.value.replace(/\s/g, '');
        setPassword(spaceRemovedInput);
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (id === '' || id.includes(" ")) {
            // render warning message
            alert('아이디에 공백을 입력하실수 없습니다.');
            return;
        }

        if (password === '' || password.includes(" ")) {
            // render warning message
            alert('비밀번호에 공백을 입력하실수 없습니다.');
            return;
        }

        // 아이디 - 대,소문자 구별없이 6 ~ 24자
        const lowerCaseId = id.toLowerCase();
        const regId = new RegExp(/^[a-z]+[a-z0-9]{5,23}$/g);
        if (!regId.test(lowerCaseId)) {
            // render warning message
            alert('아이디는 대,소문자 구별없이 6~24자 입니다.');
            return;
        }

        // 비밀번호 - 각 소문자,대문자,숫자,특수문자 한개 이상의 8 ~ 16자리
        const regPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/);
        if (!regPassword.test(password)) {
            // render warning message
            alert('비밀번호 - 각 소문자,대문자,숫자,특수문자 한개 이상의 8 ~ 16자리입니다.');
            return;
        }

        // disable button while sending request

        if (!submitButtonRef.current) {
            return;
        }

        submitButtonRef.current.disabled = true;

        fetch(`${process.env.NEXT_PUBLIC_URL}/admin/postAdminLogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                password
            })
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    // Throw an error with status and response text
                    throw {
                        status: response.status,
                        statusText: response.statusText,
                        errorMessage: text
                    };
                });
            }
            return; 
        })
        .then(() => {
            alert('로그인 하셨습니다!');
            window.location.href = '/admin/dashboard';
        })
        .catch((error) => {
            const statusCode = error.status; 
            if (statusCode === 401) {
                alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
                return;
            }
            alert('연결에 실패 했습니다.');
        })
        .finally(() => {
            if (submitButtonRef && submitButtonRef.current) {
                submitButtonRef.current.disabled = false;
            }
        });
    }

    return (

        <>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <h2>관리자 로그인</h2>
                    <label className={styles.label}>아이디</label>
                    <input className={styles.input} type='text' maxLength={24} placeholder="아이디를 입력해주세요." value={id} onChange={onId}></input>
                    <label className={styles.label}>비밀번호</label>
                    <input className={styles.input} type='password' maxLength={16} placeholder="비밀번호를 입력해주세요." value={password} onChange={onPassword}></input>
                    <button className={styles.button} type="submit" ref={submitButtonRef}>로그인</button>
                </form>
            </div>
        </>

    );
}

export default AdminLogin;