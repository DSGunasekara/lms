import React from "react";

const CreateModuleForm = () =>{
    return(
        <div className={"container"}>
            <h1 className="display-5 text-center my-5" fw-bold text-white >Upload your Data</h1>
            <form className="rounded border p-5 bg-light w-75 d-flex flex-column mx-auto mb-4">
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="titleLabel" className="form-label">

                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="titleLabel"


                        />
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Description
                            </label>
                            <textarea
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                rows={"5"}


                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Input Your File</label>
                        <input
                            className="form-control"
                            type="file"
                            id="formFile"


                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateModuleForm;
