import React,{useContext, useState, useEffect} from 'react'
import styles from '../SelectTemplate.module.css'
import { EmailDataContext } from './EmailTemplate';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
const EditSendEmail = () => {
    const [templateValues,setTemplateValues] = useState({})
    useEffect(()=>{
        setTemplateValues(location.state)
    }, [])
    const location = useLocation()
    // const { an } = location.state
    const customAxios = axios.create({
        baseURL: `https://sales.zuri.chat/api/v1/`,
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    });
console.log('state', location.state)
console.log(templateValues)
    const data =useContext(EmailDataContext);
    console.log(data)
    const handleSend = (e) =>{

        e.preventDefault()
        console.log(templateValues)
        customAxios
                .post(`email-template/sendmail/${templateValues._id}/`,{

                        "email": templateValues.email,
                        "subject": templateValues.subject,
                        "mail_body": templateValues.message

     
                })
                .then(res=>{
                  console.log(res)
                  alert('Email sent successfully')
                  
                })
                .catch(error=>{
                  console.log(error)
                })
      }

    return (
        <>
       
        <div className={styles.selectemailtop}>
            <h3 className={styles.templateTitle} >{templateValues.template_name}</h3>
            <div className={styles.topbuttons}>
                <button className={styles.button}>Save</button>
                <button className={`${styles.button}`,`${styles.buttonred}`}>Delete</button>
            </div>
        </div>
            <div className={styles.formContainer}>
                <section>
                    <h3 className={styles.templateHeader}>{templateValues.template_name} Template</h3>
                    <p className={styles.templateSubHeader}>Create a template for your emails.
                        Provide all possible details about
                        your template.
                    </p>
                </section>
                <form className={styles.form}>
                    <div className={styles.formInput}>
                        <label className={`${styles.labeltext}`}>To</label>
                        <input type="text" className={styles.input} value={templateValues.email} defaultValue={templateValues.email} onChange={(e)=>{setTemplateValues(e.target.value)}}/>
                    </div>
                    <div className={styles.formInput}>
                        <label className={`${styles.labeltext}`}>Subject</label>
                        <input type="text" className={styles.input} value={templateValues.subject} defaultValue={templateValues.subject} onChange={(e)=>{setTemplateValues(e.target.value)}}/>
                    </div>
                    <div className={styles.formInput}>
                        <label className={`${styles.labeltext}`}>Message</label>
                        <input type="text" className={`${styles.input}`, `${styles.inputmessage}`} value={templateValues.message} defaultValue={templateValues.message} onChange={(e)=>{setTemplateValues(e.target.value)}}/>
                    </div>
                    <button className={styles.sendbutton} onClick={handleSend}>Send</button>
                </form>
            </div>
        </>

    )
}

export default EditSendEmail
