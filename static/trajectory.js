document.addEventListener("DOMContentLoaded", function () {
    const svg = d3.select("svg");
    const width = parseInt(svg.style("width"));
    const height = parseInt(svg.style("height"));
    const startTimePicker = document.getElementById("startTime");
    const endTimePicker = document.getElementById("endTime");
    const licensePlatesInput = document.getElementById("licensePlates");
    const queryTrajectoriesButton = document.getElementById("queryTrajectories");
    const goHomeButton = document.getElementById("goHome");

    const data = {
        nodes: [{'id': 'JHNC', 'value': 33301}, {'id': 'XZP', 'value': 26363}, {'id': 'QJZLCHDD', 'value': 22241}, {'id': 'QJLK', 'value': 20928}, {'id': '', 'value': 15538}, {'id': 'SZP', 'value': 13745}, {'id': 'HYZT', 'value': 9585}, {'id': 'ZHDD', 'value': 9429}, {'id': 'DYZX', 'value': 7060}, {'id': 'JNLK', 'value': 4163}, {'id': 'TPHC', 'value': 3856}, {'id': 'LYQ', 'value': 3379}, {'id': 'JYHC', 'value': 3129}, {'id': 'HYJS', 'value': 2611}, {'id': 'TPZT', 'value': 2551}, {'id': 'YJQ', 'value': 2103}, {'id': 'DZP', 'value': 1995}, {'id': 'BJZT', 'value': 202}, {'id': 'BJQJ', 'value': 150}, {'id': 'SHUXIYILU', 'value': 92}],
        links:[{'source': 'QJLK', 'target': 'QJZLCHDD'}, {'source': 'QJLK', 'target': 'TPHC'}, {'source': 'QJLK', 'target': 'JNLK'}, {'source': 'QJLK', 'target': 'ZHDD'}, {'source': 'QJLK', 'target': 'TPZT'}, {'source': 'QJLK', 'target': 'HYJS'}, {'source': 'QJLK', 'target': 'BJQJ'}, {'source': 'QJLK', 'target': 'JYHC'}, {'source': 'QJLK', 'target': 'JHNC'}, {'source': 'QJLK', 'target': 'QJLK'}, {'source': 'QJLK', 'target': 'XZP'}, {'source': 'QJLK', 'target': 'HYZT'}, {'source': 'QJLK', 'target': 'SZP'}, {'source': 'QJLK', 'target': 'DZP'}, {'source': 'QJLK', 'target': 'DYZX'}, {'source': 'QJLK', 'target': 'LYQ'}, {'source': 'QJZLCHDD', 'target': 'QJZLCHDD'}, {'source': 'QJZLCHDD', 'target': 'TPHC'}, {'source': 'QJZLCHDD', 'target': 'JNLK'}, {'source': 'QJZLCHDD', 'target': 'HYZT'}, {'source': 'QJZLCHDD', 'target': 'ZHDD'}, {'source': 'QJZLCHDD', 'target': 'HYJS'}, {'source': 'QJZLCHDD', 'target': 'BJQJ'}, {'source': 'QJZLCHDD', 'target': 'JYHC'}, {'source': 'QJZLCHDD', 'target': 'JHNC'}, {'source': 'QJZLCHDD', 'target': 'QJLK'}, {'source': 'QJZLCHDD', 'target': 'XZP'}, {'source': 'QJZLCHDD', 'target': 'TPZT'}, {'source': 'QJZLCHDD', 'target': 'SZP'}, {'source': 'QJZLCHDD', 'target': 'DZP'}, {'source': 'QJZLCHDD', 'target': 'DYZX'}, {'source': 'QJZLCHDD', 'target': 'LYQ'}, {'source': 'SZP', 'target': 'QJZLCHDD'}, {'source': 'SZP', 'target': 'TPHC'}, {'source': 'SZP', 'target': 'JNLK'}, {'source': 'SZP', 'target': 'ZHDD'}, {'source': 'SZP', 'target': 'TPZT'}, {'source': 'SZP', 'target': 'HYJS'}, {'source': 'SZP', 'target': 'JYHC'}, {'source': 'SZP', 'target': 'JHNC'}, {'source': 'SZP', 'target': 'QJLK'}, {'source': 'SZP', 'target': 'XZP'}, {'source': 'SZP', 'target': 'HYZT'}, {'source': 'SZP', 'target': 'SZP'}, {'source': 'SZP', 'target': 'DZP'}, {'source': 'SZP', 'target': 'DYZX'}, {'source': 'SZP', 'target': 'LYQ'}, {'source': 'XZP', 'target': 'QJZLCHDD'}, {'source': 'XZP', 'target': 'TPHC'}, {'source': 'XZP', 'target': 'JNLK'}, {'source': 'XZP', 'target': 'ZHDD'}, {'source': 'XZP', 'target': 'TPZT'}, {'source': 'XZP', 'target': 'HYJS'}, {'source': 'XZP', 'target': 'YJQ'}, {'source': 'XZP', 'target': 'JYHC'}, {'source': 'XZP', 'target': 'BJZT'}, {'source': 'XZP', 'target': 'JHNC'}, {'source': 'XZP', 'target': 'QJLK'}, {'source': 'XZP', 'target': 'XZP'}, {'source': 'XZP', 'target': 'HYZT'}, {'source': 'XZP', 'target': 'SZP'}, {'source': 'XZP', 'target': 'DZP'}, {'source': 'XZP', 'target': 'DYZX'}, {'source': 'XZP', 'target': 'LYQ'}, {'source': 'HYZT', 'target': 'QJZLCHDD'}, {'source': 'HYZT', 'target': 'TPHC'}, {'source': 'HYZT', 'target': 'JNLK'}, {'source': 'HYZT', 'target': 'HYZT'}, {'source': 'HYZT', 'target': 'ZHDD'}, {'source': 'HYZT', 'target': 'HYJS'}, {'source': 'HYZT', 'target': 'JYHC'}, {'source': 'HYZT', 'target': 'JHNC'}, {'source': 'HYZT', 'target': 'QJLK'}, {'source': 'HYZT', 'target': 'XZP'}, {'source': 'HYZT', 'target': 'TPZT'}, {'source': 'HYZT', 'target': 'SZP'}, {'source': 'HYZT', 'target': 'DYZX'}, {'source': 'HYZT', 'target': 'LYQ'}, {'source': 'ZHDD', 'target': 'QJZLCHDD'}, {'source': 'ZHDD', 'target': 'TPHC'}, {'source': 'ZHDD', 'target': 'JNLK'}, {'source': 'ZHDD', 'target': 'ZHDD'}, {'source': 'ZHDD', 'target': 'TPZT'}, {'source': 'ZHDD', 'target': 'HYJS'}, {'source': 'ZHDD', 'target': 'JYHC'}, {'source': 'ZHDD', 'target': 'JHNC'}, {'source': 'ZHDD', 'target': 'XZP'}, {'source': 'ZHDD', 'target': 'QJLK'}, {'source': 'ZHDD', 'target': 'HYZT'}, {'source': 'ZHDD', 'target': 'SZP'}, {'source': 'ZHDD', 'target': 'SHUXIYILU'}, {'source': 'ZHDD', 'target': 'DZP'}, {'source': 'ZHDD', 'target': 'DYZX'}, {'source': 'ZHDD', 'target': 'LYQ'}, {'source': 'JHNC', 'target': ''}, {'source': 'JHNC', 'target': 'QJZLCHDD'}, {'source': 'JHNC', 'target': 'TPHC'}, {'source': 'JHNC', 'target': 'JNLK'}, {'source': 'JHNC', 'target': 'ZHDD'}, {'source': 'JHNC', 'target': 'TPZT'}, {'source': 'JHNC', 'target': 'HYJS'}, {'source': 'JHNC', 'target': 'BJQJ'}, {'source': 'JHNC', 'target': 'JYHC'}, {'source': 'JHNC', 'target': 'JHNC'}, {'source': 'JHNC', 'target': 'XZP'}, {'source': 'JHNC', 'target': 'QJLK'}, {'source': 'JHNC', 'target': 'HYZT'}, {'source': 'JHNC', 'target': 'SZP'}, {'source': 'JHNC', 'target': 'DZP'}, {'source': 'JHNC', 'target': 'DYZX'}, {'source': 'JHNC', 'target': 'LYQ'}, {'source': 'JNLK', 'target': 'QJZLCHDD'}, {'source': 'JNLK', 'target': 'TPHC'}, {'source': 'JNLK', 'target': 'JNLK'}, {'source': 'JNLK', 'target': 'ZHDD'}, {'source': 'JNLK', 'target': 'HYJS'}, {'source': 'JNLK', 'target': 'YJQ'}, {'source': 'JNLK', 'target': 'JYHC'}, {'source': 'JNLK', 'target': 'JHNC'}, {'source': 'JNLK', 'target': 'XZP'}, {'source': 'JNLK', 'target': 'QJLK'}, {'source': 'JNLK', 'target': 'HYZT'}, {'source': 'JNLK', 'target': 'SZP'}, {'source': 'JNLK', 'target': 'DZP'}, {'source': 'JNLK', 'target': 'DYZX'}, {'source': 'JNLK', 'target': 'LYQ'}, {'source': 'LYQ', 'target': 'QJZLCHDD'}, {'source': 'LYQ', 'target': 'TPHC'}, {'source': 'LYQ', 'target': 'JNLK'}, {'source': 'LYQ', 'target': 'HYZT'}, {'source': 'LYQ', 'target': 'ZHDD'}, {'source': 'LYQ', 'target': 'HYJS'}, {'source': 'LYQ', 'target': 'BJQJ'}, {'source': 'LYQ', 'target': 'JYHC'}, {'source': 'LYQ', 'target': 'BJZT'}, {'source': 'LYQ', 'target': 'JHNC'}, {'source': 'LYQ', 'target': 'XZP'}, {'source': 'LYQ', 'target': 'QJLK'}, {'source': 'LYQ', 'target': 'TPZT'}, {'source': 'LYQ', 'target': 'SZP'}, {'source': 'LYQ', 'target': 'DZP'}, {'source': 'LYQ', 'target': 'DYZX'}, {'source': 'LYQ', 'target': 'LYQ'}, {'source': 'TPZT', 'target': 'QJZLCHDD'}, {'source': 'TPZT', 'target': 'TPHC'}, {'source': 'TPZT', 'target': 'JNLK'}, {'source': 'TPZT', 'target': 'HYZT'}, {'source': 'TPZT', 'target': 'ZHDD'}, {'source': 'TPZT', 'target': 'HYJS'}, {'source': 'TPZT', 'target': 'JYHC'}, {'source': 'TPZT', 'target': 'JHNC'}, {'source': 'TPZT', 'target': 'QJLK'}, {'source': 'TPZT', 'target': 'XZP'}, {'source': 'TPZT', 'target': 'TPZT'}, {'source': 'TPZT', 'target': 'SZP'}, {'source': 'TPZT', 'target': 'DZP'}, {'source': 'TPZT', 'target': 'DYZX'}, {'source': 'TPZT', 'target': 'LYQ'}, {'source': 'DZP', 'target': 'QJZLCHDD'}, {'source': 'DZP', 'target': 'JNLK'}, {'source': 'DZP', 'target': 'ZHDD'}, {'source': 'DZP', 'target': 'HYJS'}, {'source': 'DZP', 'target': 'JYHC'}, {'source': 'DZP', 'target': 'JHNC'}, {'source': 'DZP', 'target': 'XZP'}, {'source': 'DZP', 'target': 'QJLK'}, {'source': 'DZP', 'target': 'HYZT'}, {'source': 'DZP', 'target': 'SZP'}, {'source': 'DZP', 'target': 'DZP'}, {'source': 'DZP', 'target': 'DYZX'}, {'source': 'JYHC', 'target': 'QJZLCHDD'}, {'source': 'JYHC', 'target': 'TPHC'}, {'source': 'JYHC', 'target': 'JNLK'}, {'source': 'JYHC', 'target': 'HYZT'}, {'source': 'JYHC', 'target': 'ZHDD'}, {'source': 'JYHC', 'target': 'HYJS'}, {'source': 'JYHC', 'target': 'JYHC'}, {'source': 'JYHC', 'target': 'JHNC'}, {'source': 'JYHC', 'target': 'QJLK'}, {'source': 'JYHC', 'target': 'XZP'}, {'source': 'JYHC', 'target': 'TPZT'}, {'source': 'JYHC', 'target': 'SZP'}, {'source': 'JYHC', 'target': 'DZP'}, {'source': 'JYHC', 'target': 'LYQ'}, {'source': 'TPHC', 'target': 'QJZLCHDD'}, {'source': 'TPHC', 'target': 'TPHC'}, {'source': 'TPHC', 'target': 'JNLK'}, {'source': 'TPHC', 'target': 'HYZT'}, {'source': 'TPHC', 'target': 'ZHDD'}, {'source': 'TPHC', 'target': 'JYHC'}, {'source': 'TPHC', 'target': 'JHNC'}, {'source': 'TPHC', 'target': 'XZP'}, {'source': 'TPHC', 'target': 'QJLK'}, {'source': 'TPHC', 'target': 'TPZT'}, {'source': 'TPHC', 'target': 'SZP'}, {'source': 'TPHC', 'target': 'DZP'}, {'source': 'TPHC', 'target': 'DYZX'}, {'source': 'HYJS', 'target': 'QJZLCHDD'}, {'source': 'HYJS', 'target': 'TPHC'}, {'source': 'HYJS', 'target': 'JNLK'}, {'source': 'HYJS', 'target': 'HYZT'}, {'source': 'HYJS', 'target': 'ZHDD'}, {'source': 'HYJS', 'target': 'HYJS'}, {'source': 'HYJS', 'target': 'BJQJ'}, {'source': 'HYJS', 'target': 'JYHC'}, {'source': 'HYJS', 'target': 'BJZT'}, {'source': 'HYJS', 'target': 'JHNC'}, {'source': 'HYJS', 'target': 'XZP'}, {'source': 'HYJS', 'target': 'QJLK'}, {'source': 'HYJS', 'target': 'TPZT'}, {'source': 'HYJS', 'target': 'SZP'}, {'source': 'HYJS', 'target': 'DZP'}, {'source': 'HYJS', 'target': 'DYZX'}, {'source': 'HYJS', 'target': 'LYQ'}, {'source': 'DYZX', 'target': 'QJZLCHDD'}, {'source': 'DYZX', 'target': 'TPHC'}, {'source': 'DYZX', 'target': 'HYZT'}, {'source': 'DYZX', 'target': 'ZHDD'}, {'source': 'DYZX', 'target': 'HYJS'}, {'source': 'DYZX', 'target': 'BJQJ'}, {'source': 'DYZX', 'target': 'QJLK'}, {'source': 'DYZX', 'target': 'XZP'}, {'source': 'DYZX', 'target': 'TPZT'}, {'source': 'DYZX', 'target': 'SZP'}, {'source': 'DYZX', 'target': 'DZP'}, {'source': 'DYZX', 'target': 'DYZX'}, {'source': 'DYZX', 'target': 'LYQ'}, {'source': 'BJQJ', 'target': 'HYJS'}, {'source': 'BJQJ', 'target': 'BJZT'}, {'source': 'BJQJ', 'target': 'XZP'}, {'source': 'BJQJ', 'target': 'HYZT'}, {'source': 'BJQJ', 'target': 'LYQ'}, {'source': 'BJZT', 'target': 'QJZLCHDD'}, {'source': 'BJZT', 'target': 'XZP'}, {'source': 'BJZT', 'target': 'LYQ'}, {'source': '', 'target': ''}, {'source': '', 'target': 'SZP'}, {'source': '', 'target': 'JHNC'}, {'source': '', 'target': 'XZP'}, {'source': 'YJQ', 'target': 'SZP'}, {'source': 'YJQ', 'target': 'YJQ'}, {'source': 'SHUXIYILU', 'target': 'SZP'}]
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
        .attr("class", "link");

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

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("transform", d => `translate(${d.x},${d.y})`);
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

    queryTrajectoriesButton.addEventListener("click", function () {
        const startTimeValue = startTimePicker.value;
        const endTimeValue = endTimePicker.value;
        const licensePlates = licensePlatesInput.value.split(',').map(plate => plate.trim());

        const params = {
            startTime: startTimeValue,
            endTime: endTimeValue,
            carId: licensePlates
        };

        axios.post('http://106.52.17.197:5000/vehicle_track', params)
            .then(response => {
                showTrajectories(response.data);
            })
            .catch(error => {
                console.error('Error querying trajectories:', error);
            });
    });

    goHomeButton.addEventListener("click", function () {
        window.location.href = '../static/index.html'; // Adjust the URL to your homepage
    });

    function showTrajectories(flowData) {
        flowData.forEach(flow => animateFlow(flow));
    }

    function animateFlow(flow) {
        let index = 0;

        function step() {
            if (index >= flow.nodes.length - 1) {
                setTimeout(() => {
                    alert(`车牌号 ${flow.carId} 的轨迹呈现完毕`);
                }, 5000);
                return;
            }

            const sourceNode = data.nodes.find(n => n.id === flow.nodes[index]);
            const targetNode = data.nodes.find(n => n.id === flow.nodes[index + 1]);

            if (sourceNode && targetNode) {
                const path = svg.append("line")
                    .attr("class", "flow-path")
                    .attr("stroke", flow.color)
                    .attr("marker-end", "url(#arrow)");

                const label = svg.append("text")
                    .attr("class", "label")
                    .text(flow.carId);

                path.transition()
                    .duration(3000)
                    .attrTween("x1", () => d3.interpolate(sourceNode.x, targetNode.x))
                    .attrTween("y1", () => d3.interpolate(sourceNode.y, targetNode.y))
                    .attrTween("x2", () => d3.interpolate(sourceNode.x, targetNode.x))
                    .attrTween("y2", () => d3.interpolate(sourceNode.y, targetNode.y))
                    .on("end", () => {
                        index++;
                        step();
                    });

                label.transition()
                    .duration(3000)
                    .attrTween("x", () => d3.interpolate(sourceNode.x, targetNode.x))
                    .attrTween("y", () => d3.interpolate(sourceNode.y, targetNode.y));
            }
        }

        step();
    }
});