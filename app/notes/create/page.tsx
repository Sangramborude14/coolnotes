export default function createNote(){
    return(
        <>
        <h1>Create the coolest note possible</h1>
        <div>
            <form>
                <input type="text" id="heading" name="heading" placeholder="Heading"/>
                <br/>
                <textarea rows={30} cols={30}>
                    Write down your Notes
                </textarea>
                <br/>
                <div>
                    <button type="submit" >SAVE</button>
                </div>
            </form>
        </div>
        </>
    )
}