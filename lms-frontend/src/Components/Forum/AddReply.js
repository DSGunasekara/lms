import React, { useState } from 'react';

const AddReply = ({addReply}) => {

    const [replyData, setReplyData] = useState()

    return (
        <div>
            <form>
                <div>
                    <div className="mb-3 col">
                        <label htmlFor="replyLabel" className="form-label">
                            Reply
                        </label>
                        <textarea
                            type="textArea"
                            className="form-control"
                            id="replyLabel"
                            value={replyData}
                            onChange={(e) =>setReplyData(e.target.value)}
                        />
                    </div>                    
                    <button className="btn btn-primary" onClick={(e)=>{
                        e.preventDefault()
                        addReply(replyData)}
                    }>
                        Post to Forum
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddReply;
