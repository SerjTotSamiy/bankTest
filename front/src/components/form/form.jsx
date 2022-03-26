import './form.scss'
import {useState} from "react";

function CheckForm() {
    const [value, setValue] = useState(null)
    const [cvv, setCvv] = useState(null)
    const [date, setDate] = useState(null)
    const [sum, setSum] = useState(null)
    const [show, setShow] = useState(true)


    function checkLength(number, event, set) {
        event.target.value.length > number ?
            set('') :
            set(event.target.value)
    }

    function checkInputs(e) {
        setSum(e.target.value)
        if (value.length === 16 && cvv.length === 3 && date) {
            setShow(false)
        } else {
            setShow(true)
        }
    }


    return <form action="/card" name={"card"} aria-required={true} method={'post'}>
        <input type="number" required={true} placeholder={"Введите номер карты"} name={"card"}
               onChange={event => checkLength(16, event, setValue)} value={value}/>
        <input type="month" required={true} name={'date'} onChange={event => setDate(event.target.value)}/>
        <input type="number" required={true} maxLength={3} placeholder={"CVV"} name={'cvv'}
               onChange={e => checkLength(3, e, setCvv)} value={cvv}/>
        <input type="number" required={true} placeholder={"Введите сумму"} name={'amount'}
               onChange={event => checkInputs(event)}/>
        <input type="submit" value={'Pay'} className={'check-button'} hidden={show}/>
    </form>
}

export default CheckForm
