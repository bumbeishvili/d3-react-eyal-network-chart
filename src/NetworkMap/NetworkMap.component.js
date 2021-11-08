import React, { useLayoutEffect, useRef } from "react";
import { NetworkMap } from "./NetworkMap.d3";
import "./NetworkMap.css"



export class NetworkMapComponent extends React.Component {

    // Handle component mounting event
    componentDidMount() {
        this.createDiagram = this.createDiagram.bind(this)
        this.createDiagram()
    }

    // Handle component update event
    componentDidUpdate(prevProps, prevState) {
        if (this.props.disableUpdate) {
            return
        }
        this.createDiagram()
    }

    // Render chart
    render() {
        return (
            <div
                style={{ display: this.props.hide ? "none" : "inline-block" }}
                className="d3-network-map d3-chart-container"
            >
                <div ref={(node) => (this.node = node)} />

            </div>
        )
    }

    // Reusable, create diagram function
    createDiagram() {
        // Retrieve node dom element
        const node = this.node

        // If there is no data, exit from component
        if (!this.props.data) {
            return
        }

        // Retrieve props
        const props = this.props

        // Create chart reference

        if (!this.chart) {
            /* eslint-disable */
            this.chart = new NetworkMap()
        }

        // Pass chart some parameters and (re)render it
        this.chart
            .container(node)
            .data(props.data, props.initialDepth || 1)

        if (props.svgHeight !== undefined) {
            this.chart.svgHeight(props.svgHeight)
        }

        if (props.marginTop !== undefined) {
            this.chart.marginTop(props.marginTop)
        }

        if (props.marginBottom !== undefined) {
            this.chart.marginBottom(props.marginBottom)
        }

        if (props.marginRight !== undefined) {
            this.chart.marginRight(props.marginRight)
        }

        if (props.marginLeft !== undefined) {
            this.chart.marginLeft(props.marginLeft)
        }
        if (props.normalCircleRadius !== undefined) {
            this.chart.normalCircleRadius(props.normalCircleRadius)
        }

        if (props.rootCircleRadius !== undefined) {
            this.chart.rootCircleRadius(props.rootCircleRadius)
        }
        if (props.initialLinkColor !== undefined) {
            this.chart.initialLinkColor(props.initialLinkColor)
        }

        if (props.isTree !== undefined) {
            this.chart.isTree(props.isTree)
        }


        this.chart
            .render();

    }
}