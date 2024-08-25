document.addEventListener("DOMContentLoaded", function () {
    const svg = d3.select("svg");
    const width = parseInt(svg.style("width"));
    const height = parseInt(svg.style("height"));
    const startTimePicker = document.getElementById("startTime");
    const endTimePicker = document.getElementById("endTime");
    const showTrajectoriesButton = document.getElementById("showTrajectories");

    const data = {
        nodes: [
            { id: "A" }, { id: "B" }, { id: "C" }, { id: "D" }
        ],
        links: [
            { source: "A", target: "B" },
            { source: "B", target: "C" },
            { source: "C", target: "D" },
            { source: "D", target: "A" }
        ]
    };

    svg.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 10)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");

    const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink(data.links).id(d => d.id).distance(150))
        .force("charge", d3.forceManyBody().strength(-500))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(data.links)
        .enter().append("line")
        .attr("class", "link")
        .on("click", function(event, d) {
            sendLinkData(d);
        });

    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(data.nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("circle")
        .attr("r", 10);

    node.append("text")
        .text(d => d.id)
        .attr("x", 12)
        .attr("y", 3);

    const paths = [];
    const labels = [];

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("transform", d => `translate(${d.x},${d.y})`);
        svg.selectAll(".traffic-label").remove();

        paths.forEach(({ path, source, target }) => {
            path.attr("x1", source.x)
                .attr("y1", source.y)
                .attr("x2", target.x)
                .attr("y2", target.y);
        });

        labels.forEach(({ label, source, target }) => {
            label.attr("x", (source.x + target.x) / 2)
                .attr("y", (source.y + target.y) / 2);
        });
    });

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
    function animateFlow(flow) {
                let index = 0;

                function step() {
                    if (index >= flow.nodes.length - 1) {
                        setTimeout(() => {
                            alert(`车牌号 ${flow.carId} 的轨迹呈现完毕`);
                        }, 3000);
                        return;
                    }

                    const sourceNode = data.nodes.find(n => n.id === flow.nodes[index]);
                    const targetNode = data.nodes.find(n => n.id === flow.nodes[index + 1]);

                    if (sourceNode && targetNode) {
                        const path = svg.append("line")
                            .attr("class", "flow-path")
                            .attr("stroke", flow.color)
                            .attr("marker-end", "url(#arrow)");

                        paths.push({ path, source: sourceNode, target: targetNode });

                        const label = svg.append("text")
                            .attr("class", "label")
                            .text(flow.carId);

                        labels.push({ label, source: sourceNode, target: targetNode });

                        path.transition()
                            .duration(3000)
                            .attr("x1", sourceNode.x)
                            .attr("y1", sourceNode.y)
                            .attr("x2", targetNode.x)
                            .attr("y2", targetNode.y)
                            .on("end", () => {
                                index++;
                                step();
                            });
                    }
                }

                step();
            }
// 发送请求，获取节点间流量数据
    function sendLinkData(link) {
        const startTimeValue = startTimePicker.value;
        const endTimeValue = endTimePicker.value;
        const params = {
            source: link.source.id,
            target: link.target.id
        };

        if (startTimeValue && endTimeValue) {
            params.startTime = startTimeValue;
            params.endTime = endTimeValue;
        }

        axios.post('http://106.52.17.197:5000/vehicle_track', params)
            .then(response => {
                showTrafficData(link, response.data);
                console.log('Traffic data:', response.data);
            })
            .catch(error => {
                console.error('Error sending link data:', error);
            });
    }
    // 显示节点间流量数据
       function showTrafficData(link, trafficData) {
        const midX = (link.source.x + link.target.x) / 2;
        const midY = (link.source.y + link.target.y) / 2;

        svg.append("text")
            .attr("class", "traffic-label")
            .attr("x", midX)
            .attr("y", midY)
            .attr("dy", -5)
            .attr("text-anchor", "middle")
            .style("fill", "black")
            .style("background", "lightgray")
            .style("padding", "2px")
            .text(trafficData)
            .attr("filter", "url(#bg)");
    }
    function showFlow(carId){
        const startTimeValue = startTimePicker.value;
        const endTimeValue = endTimePicker.value;
        const params = {
            carId: carId
        };

        if (startTimeValue && endTimeValue) {
            params.begin = startTimeValue;
            params.end = endTimeValue;
        }
        axios.get('http://106.52.17.197:5000/vehicle_track', params).then(response => {
                console.log('Traffic data:', response.data);
                response.data.forEach(flow=>animateFlow(flow));
            })
            .catch(error => {
                console.error('Error fetching trajectory data:', error);
            });

    }

    showTrajectoriesButton.addEventListener("click", function () {
        const startTimeValue = startTimePicker.value;
        const endTimeValue = endTimePicker.value;
        const url = `/trajectory-viewer?startTime=${encodeURIComponent(startTimeValue)}&endTime=${encodeURIComponent(endTimeValue)}`;
        window.location.href = '../static/vehicle_track.html';
    });
});