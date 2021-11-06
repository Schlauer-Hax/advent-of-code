import React, { Component } from 'react';
import Select from 'react-select';
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import './View.css';
import Dropzone from 'react-dropzone'
import GithubCorner from "react-github-corner";

const url = 'ws://127.0.0.1:9000/';
let ws = new WebSocket(url);

class View extends Component {
    state = {
        loading: true,
        options: [],
        textarea: false,
        runnable: false,
        input: '',
        selectedOption: null
    }

    constructor(props: any) {
        super(props);

        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount() {
        ws.onopen = (event) => {
            ws.send('aocwebsite:connected');
            document.getElementById('status')!.innerHTML = "Connected";
        }

        ws.onmessage = (event) => {
            console.log(event.data);
            const solutions = event.data.replace('aocwebserver:solutions:', '').split(':').map((batch: string) => {
                const split = batch.split(',');
                split.shift()
                return split.join(',')
            }).join(',').split(',')
            solutions.sort();
            solutions.reverse();
            this.setState({ loading: false, options: solutions.map((solution: string) => { return { value: solution, label: solution } }) });
        }

        ws.onclose = (event) => {
            setTimeout(() => {
                ws = new WebSocket(url);
            }, 5000)
        }

        this.setState({ ws: ws })
    }

    onDrop(acceptedFiles: File[]) {
        if (acceptedFiles.length === 1) {
            const file = acceptedFiles[0];
            if (file.type === 'text/plain') {
                const reader = new FileReader()
                reader.onload = () => {
                    const binaryStr = reader.result
                    console.log(binaryStr)
                    if (typeof binaryStr === 'string') {
                        (document.getElementById('input') as HTMLTextAreaElement).value = binaryStr;
                        this.checkRunnable();
                    }
                }
                reader.readAsText(file)
            }
        }
    }

    onClick() {
        const solution = (this.state.selectedOption as any).value;
        const input = (document.getElementById('input') as HTMLTextAreaElement).value;
        ws.send(`aocwebsite:run:${solution}:${input}`);
    }

    handleChange = (selectedOption: any) => {
        this.setState({ selectedOption });
        this.checkRunnable();
    };

    checkRunnable = () => {
        this.setState({ runnable: (document.getElementById('input') as HTMLTextAreaElement).value !== '' && this.state.selectedOption !== null })
    }

    render() {
        const { selectedOption } = this.state;

        return (
            <div className='view'>
                <GithubCorner href="https://github.com/Schlauer-Hax/advent-of-code/" />
                <h2 id="status">Connecting to Websocket...</h2>
                <p id="solutions"></p>
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    className='dropdown' options={this.state.options}
                    isLoading={this.state.loading}
                />
                <br />
                <Dropzone noClick onDrop={this.onDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <textarea id='input' placeholder='Put your Input here' onChange={(e) => { this.checkRunnable() }}></textarea>
                            </div>
                        </section>
                    )}
                </Dropzone>
                <br />
                <Button variant="primary" disabled={!this.state.runnable} onClick={(e) => this.onClick()}>Run Solution</Button>{' '}
            </div>
        );
    }
}

export default View;