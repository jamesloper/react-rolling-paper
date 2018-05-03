import React, { Component } from 'react';

const clamp = (num, min, max) => (num < min ? min : num > max ? max : num);
const addListener = document.addEventListener;
const removeListener = document.removeEventListener;

class RollingPaper extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {children, className} = this.props;
		const {hover, visiblePercent} = this.state;

		const classes = ['scroller', className];
		if (hover) classes.push('active');

		let barStyle = {
			'height': `${visiblePercent * 100}%`,
			'display': (visiblePercent < 1) ? 'block' : 'none',
		};

		return (
			<div
				className={classes.join(' ')}
				onMouseOver={this.mouseOver}
				onScroll={this.updateScrollbar}
				onWheel={this.mouseWheel}
				onMouseLeave={this.mouseLeave}
			>
				<div
					className="scrollbar"
					ref={el => this.bar = el}
					onMouseDown={this.scrollbarStart}
					style={barStyle}
				/>
				<div
					className="scroller-content"
					ref={el => this.el = el}
					children={children}
				/>
			</div>
		);
	}

	scrollTo = (y) => {
		this.el.scrollTop = clamp(y, 0, this.totalHeight);
	};

	mouseWheel = (e) => {
		if (e.cancelable) {
			e.preventDefault();
			this.scrollTo(this.el.scrollTop + e.deltaY);
		}
	};

	updateScrollbar = () => {
		const scrollPercent = this.el.scrollTop / this.totalHeight;
		const top = scrollPercent * (1 - this.state.visiblePercent);
		this.bar.style.top = `${top * 100}%`;
	};

	mouseOver = () => {
		this.totalHeight = this.el.scrollHeight - this.el.offsetHeight;
		this.setState({
			'visiblePercent': this.el.offsetHeight / this.el.scrollHeight,
			'hover': true,
		});
	};

	scrollbarStart = (e) => {
		this.initialY = e.pageY;
		this.initialScroll = this.el.scrollTop;
		addListener('mousemove', this.dragScrollbar);
		addListener('mouseup', this.dragEnd);
		this.setState({'hover': true});
	};

	dragScrollbar = (e) => {
		const {visiblePercent} = this.state;
		const dy = e.pageY - this.initialY;
		this.scrollTo(this.initialScroll + dy / visiblePercent);
	};

	dragEnd = () => {
		removeListener('mousemove', this.dragScrollbar);
		removeListener('mouseup', this.dragEnd);
		this.setState({'hover': false});
	};

	mouseLeave = () => {
		this.setState({'hover': false});
	};
}

export default RollingPaper;