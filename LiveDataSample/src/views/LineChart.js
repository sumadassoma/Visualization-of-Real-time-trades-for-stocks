import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options: {
				animationEnabled: true,
				exportEnabled: true,
				theme: "dark1", 
				title: {
					text: "Line chart"
				},
				axisY: {
					title: "USD",
					prefix: "$",
					valueFormatString: '#########.###',
					includeZero: false
				},
				data: [{
					name: "Binance Bitcoin",
					type: "line",
					showInLegend: true,
					options: {
						maintainAspectRatio: false
					},
					toolTipContent: "{x}: ${y}",
					dataPoints: [
					]
				},
				{
					name: "Amazon",
					type: "line",
					showInLegend: true,
					options: {
						maintainAspectRatio: false
					},
					toolTipContent: "{x}: ${y}",
					dataPoints: [
					]
				}
			]
			},
			isHookActive : false
		}
		this.unsubscribe = this.unsubscribe.bind(this);
		this.setWebHook = this.setWebHook.bind(this);
		
	}
	componentDidMount(){
		this.setWebHook();
	}
	setWebHook() {
		this.socket = new WebSocket('wss://ws.finnhub.io?token=bujpqa748v6tkps41v00');

		// Connection opened -> Subscribe
		this.socket.addEventListener('open', function (event) {
			this.socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT' }));
			this.socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'AMZN' }));
		}.bind(this));

		// Listen for messages
		this.socket.addEventListener('message', function (event) {
			var response = JSON.parse(event.data);
			console.log(response);
			if(response && response.data &&  response.data[0]){
				var data = response.data[0];
				if(data && data.s === "BINANCE:BTCUSDT"){
					this.state.options.data[0].dataPoints.push({ x: new Date(new Date(data.t).toISOString()), y: parseFloat(data.p) });
				}else if(data && data.s === "AMZN"){
					this.state.options.data[1].dataPoints.push({ x: new Date(new Date(data.t).toISOString()), y: parseFloat(data.p) });
				}
			}
			if(this.chart){
				this.chart.render();
			}
		}.bind(this));
		this.setState({isHookActive:true,options:this.state.options});
	}

	unsubscribe() {
		this.socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': 'BINANCE:BTCUSDT' }));
		this.socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': 'AMZN' }));
		this.socket.close();
		this.setState({isHookActive:false,options:this.state.options});
	}

	render() {
		var primaryButtonStyle ={ marginTop : '20px', borderRadius: '16px', border: '1px', padding: '4px 12px', background: '#64ad6a', cursor: ""  };
		var secondaryButtonStyle ={ marginLeft: '10px', marginTop : '20px', borderRadius: '16px', border: '1px', padding: '4px 12px', background: '#dd3439', cursor: ""  };
		primaryButtonStyle.cursor = this.state.isHookActive ? "default" : "pointer";
		secondaryButtonStyle.cursor = this.state.isHookActive ? "pointer" : "default";
		return (
			<div style={{marginTop:"20px"}}>
				<CanvasJSChart options={this.state.options}
					onRef={ref => this.chart = ref}
				/>
				<div style={{textAlign:"center"}}>
					<button style={primaryButtonStyle} onClick={() => { this.setWebHook() }} disabled={this.state.isHookActive}>Subscribe</button>
					<button style={secondaryButtonStyle} onClick={() => { this.unsubscribe() }} disabled={!this.state.isHookActive}>Unsubscribe</button>
				</div>
			</div>
		);
	}
}

export default LineChart;                           