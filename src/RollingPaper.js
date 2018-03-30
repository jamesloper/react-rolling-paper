import React, { Component } from 'react';

const __el = document.createElement('div').style;
const xform = ['transform', 'webkitTransform', 'msTransform', 'MozTransform', 'OTransform'].find(v => v in __el);

class RollingPaper extends Component {
	constructor(props) {
		super(props);
		this.mouseOver = this.mouseOver.bind(this);
		this.scrollWheel = this.scrollWheel.bind(this);
		this.scroll = this.scroll.bind(this);
		this.startDraggingScrollbar = this.startDraggingScrollbar.bind(this);
		this.dragScrollbar = this.dragScrollbar.bind(this);
		this.dragEnd = this.dragEnd.bind(this);
		this.state = {active: false};
	}

	render() {
		const {children, className} = this.props;
		const {active, visiblePercent} = this.state;

		let activeClass = (active) ? 'scroller-active' : '';
		let barStyle = {
			height: `${visiblePercent * 100}%`,
			display: (visiblePercent < 1) ? 'block' : 'none',
		};

		return (
			<div
				ref={el => this.el = el}
				className={`${className} scroller ${activeClass}`}
				onMouseOver={this.mouseOver}
				onWheel={this.scrollWheel}
				onScroll={this.scroll}
			>
				<div
					className="scrollbar"
					ref={el => this.bar = el}
					onMouseDown={this.startDraggingScrollbar}
					style={barStyle}
				/>
				{children}
			</div>
		);
	}

	mouseOver() {
		const visiblePercent = this.el.offsetHeight / this.el.scrollHeight;
		this.setState({'visiblePercent': visiblePercent});
	}

	scrollWheel(e) {
		const max = this.el.scrollHeight - this.el.offsetHeight;

		let y = this.el.scrollTop + e.deltaY;
		if (y > max) {
			y = max;
		} else if (y < 0) {
			y = 0;
		} else {
			e.preventDefault();
			e.stopPropagation();
		}

		this.el.scrollTop = y;
	}

	scroll() {
		const {visiblePercent} = this.state;
		let px = this.el.scrollTop * (visiblePercent + 1);
		this.bar.style[xform] = `translateY(${px}px)`;
	}

	startDraggingScrollbar(e) {
		this.initialY = e.pageY;
		this.initialScroll = this.el.scrollTop;
		document.addEventListener('mousemove', this.dragScrollbar);
		document.addEventListener('mouseup', this.dragEnd);
		this.setState({'active': true});
	}

	dragScrollbar(e) {
		const {visiblePercent} = this.state;
		this.el.scrollTop = this.initialScroll + (e.pageY - this.initialY) / visiblePercent;
	}

	dragEnd() {
		document.removeEventListener('mousemove', this.dragScrollbar);
		document.removeEventListener('mouseup', this.dragEnd);
		this.setState({'active': false});
	}
}

export default RollingPaper;