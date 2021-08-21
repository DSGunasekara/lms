import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function AddStudent(props){
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));

    return(
        <div>
            <form>
                <div class="mb-3">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" id="title" placeholder="Title" />
                </div>
                <div class="mb-3">
                    <label for="module-code">Module Code</label>
                    <input type="text" class="form-control" id="module-code" placeholder="SE0001" />
                </div>
                <div class="mb-3">
                    <label for="week">Week</label>
                    <input type="text" class="form-control" id="week" placeholder="Week 1" />
                </div>
                <div class="mb-3">
                    <label for="discription" class="form-label">Description</label>
                    <textarea class="form-control" id="discription" rows="3" placeholder="Type something here..."></textarea>
                </div>
                <div {...getRootProps({className: 'dropzone'})}>
                    <label for="file">Upload File</label>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <button type='submit' class='btn btn-primary'>Submit</button>
            </form>
        </div>
        
    )
}