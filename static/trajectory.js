document.addEventListener("DOMContentLoaded", function () {
    const svg = d3.select("svg");
    const width = parseInt(svg.style("width"));
    const height = parseInt(svg.style("height"));
    const startTimePicker = document.getElementById("startTime");
    const endTimePicker = document.getElementById("endTime");
    startTimePicker.value = "2023-10-01T15:00";
    endTimePicker.value = "2023-10-01T16:00";
    const licensePlatesInput = document.getElementById("licensePlates");
    const queryTrajectoriesButton = document.getElementById("queryTrajectories");
    const goHomeButton = document.getElementById("goHome");

    const data = {
        nodes: [{'id': 'JHNC', 'value': 33301}, {'id': 'XZP', 'value': 26363}, {'id': 'QJZLCHDD', 'value': 22241}, {'id': 'QJLK', 'value': 20928}, {'id': '', 'value': 15538}, {'id': 'SZP', 'value': 13745}, {'id': 'HYZT', 'value': 9585}, {'id': 'ZHDD', 'value': 9429}, {'id': 'DYZX', 'value': 7060}, {'id': 'JNLK', 'value': 4163}, {'id': 'TPHC', 'value': 3856}, {'id': 'LYQ', 'value': 3379}, {'id': 'JYHC', 'value': 3129}, {'id': 'HYJS', 'value': 2611}, {'id': 'TPZT', 'value': 2551}, {'id': 'YJQ', 'value': 2103}, {'id': 'DZP', 'value': 1995}, {'id': 'BJZT', 'value': 202}, {'id': 'BJQJ', 'value': 150}, {'id': 'SHUXIYILU', 'value': 92}],
        links: [{'source': 'ZHDD', 'target': 'HYZT'}, {'source': 'ZHDD', 'target': 'LYQ'}, {'source': 'DZP', 'target': 'XZP'}, {'source': 'JYHC', 'target': 'TPHC'}, {'source': 'TPHC', 'target': 'DYZX'}, {'source': 'DZP', 'target': 'QJZLCHDD'}, {'source': 'HYZT', 'target': 'DYZX'}, {'source': 'SZP', 'target': 'JNLK'}, {'source': 'QJLK', 'target': 'JYHC'}, {'source': 'SZP', 'target': 'JNLK'}, {'source': 'SZP', 'target': 'DZP'}, {'source': 'JNLK', 'target': 'XZP'}, {'source': 'JNLK', 'target': 'QJLK'}, {'source': 'JYHC', 'target': 'XZP'}, {'source': 'SZP', 'target': 'JYHC'}, {'source': 'SZP', 'target': 'JYHC'}, {'source': 'XZP', 'target': 'JHNC'}, {'source': 'XZP', 'target': 'LYQ'}, {'source': 'HYJS', 'target': 'HYZT'}, {'source': 'JHNC', 'target': 'XZP'}, {'source': 'BJQJ', 'target': 'XZP'}, {'source': 'JHNC', 'target': 'XZP'}, {'source': 'HYZT', 'target': 'TPZT'}, {'source': 'XZP', 'target': 'JHNC'}, {'source': 'JNLK', 'target': 'SZP'}, {'source': 'HYZT', 'target': 'JYHC'}, {'source': 'JHNC', 'target': ''}, {'source': 'HYZT', 'target': 'JHNC'}, {'source': 'SZP', 'target': 'JYHC'}, {'source': 'QJLK', 'target': 'HYJS'}, {'source': 'DZP', 'target': 'XZP'}, {'source': 'HYZT', 'target': 'TPZT'}, {'source': 'JHNC', 'target': 'HYJS'}, {'source': 'XZP', 'target': 'LYQ'}, {'source': 'JNLK', 'target': 'ZHDD'}, {'source': 'ZHDD', 'target': 'HYZT'}, {'source': 'JHNC', 'target': 'XZP'}, {'source': 'HYJS', 'target': 'QJZLCHDD'}, {'source': 'TPHC', 'target': 'XZP'}, {'source': 'LYQ', 'target': 'TPZT'}, {'source': 'JYHC', 'target': 'LYQ'}, {'source': 'LYQ', 'target': 'JYHC'}, {'source': 'XZP', 'target': 'JYHC'}, {'source': 'DZP', 'target': 'QJLK'}, {'source': 'JNLK', 'target': 'JHNC'}, {'source': 'TPZT', 'target': 'HYZT'}, {'source': 'LYQ', 'target': 'SZP'}, {'source': 'DZP', 'target': 'QJZLCHDD'}, {'source': 'SZP', 'target': 'JYHC'}, {'source': 'DZP', 'target': 'XZP'}, {'source': 'BJQJ', 'target': 'LYQ'}, {'source': 'JNLK', 'target': 'XZP'}, {'source': 'XZP', 'target': 'JNLK'}, {'source': 'JYHC', 'target': 'LYQ'}, {'source': 'LYQ', 'target': 'SZP'}, {'source': 'TPZT', 'target': 'HYJS'}, {'source': 'XZP', 'target': 'JNLK'}, {'source': 'SZP', 'target': 'LYQ'}, {'source': 'LYQ', 'target': 'HYZT'}, {'source': 'TPHC', 'target': 'QJZLCHDD'}, {'source': 'JNLK', 'target': 'SZP'}, {'source': 'LYQ', 'target': 'XZP'}, {'source': 'JYHC', 'target': 'QJLK'}, {'source': 'QJZLCHDD', 'target': 'HYJS'}, {'source': 'DZP', 'target': 'QJLK'}, {'source': 'QJLK', 'target': 'HYJS'}, {'source': 'HYJS', 'target': 'TPZT'}, {'source': 'SZP', 'target': 'LYQ'}, {'source': 'LYQ', 'target': 'XZP'}, {'source': 'ZHDD', 'target': 'HYJS'}, {'source': 'ZHDD', 'target': 'QJLK'}, {'source': 'TPZT', 'target': 'HYJS'}, {'source': 'SZP', 'target': 'JNLK'}, {'source': 'LYQ', 'target': 'SZP'}, {'source': 'LYQ', 'target': 'HYZT'}, {'source': 'QJLK', 'target': 'JNLK'}, {'source': 'TPZT', 'target': 'LYQ'}, {'source': 'JHNC', 'target': ''}, {'source': 'BJQJ', 'target': 'LYQ'}, {'source': 'XZP', 'target': 'JYHC'}, {'source': 'HYJS', 'target': 'TPHC'}, {'source': 'QJZLCHDD', 'target': 'HYJS'}, {'source': 'BJZT', 'target': 'XZP'}, {'source': 'JNLK', 'target': 'QJLK'}, {'source': 'LYQ', 'target': 'DYZX'}, {'source': 'QJLK', 'target': 'DZP'}, {'source': 'XZP', 'target': 'JNLK'}, {'source': 'JNLK', 'target': 'XZP'}, {'source': 'LYQ', 'target': 'SZP'}, {'source': 'QJLK', 'target': 'DYZX'}, {'source': 'LYQ', 'target': 'XZP'}, {'source': 'SZP', 'target': 'JYHC'}, {'source': 'LYQ', 'target': 'SZP'}, {'source': 'LYQ', 'target': 'DYZX'}, {'source': 'TPZT', 'target': 'HYJS'}, {'source': 'HYJS', 'target': 'ZHDD'}, {'source': 'HYJS', 'target': 'QJLK'}, {'source': 'JYHC', 'target': 'TPHC'}, {'source': 'HYJS', 'target': 'BJQJ'}, {'source': 'LYQ', 'target': 'ZHDD'}, {'source': 'QJZLCHDD', 'target': 'TPZT'}, {'source': 'JNLK', 'target': 'XZP'}, {'source': 'XZP', 'target': 'JYHC'}, {'source': 'QJLK', 'target': 'TPZT'}, {'source': 'SZP', 'target': 'JNLK'}, {'source': 'JYHC', 'target': 'XZP'}, {'source': 'HYJS', 'target': 'TPZT'}, {'source': 'ZHDD', 'target': 'HYZT'}, {'source': 'XZP', 'target': 'DZP'}, {'source': 'DZP', 'target': 'QJLK'}, {'source': 'JNLK', 'target': 'XZP'},{'source': 'YJQ', 'target': 'SZP'}]
    };

    const paths = [];
    const labels = [];

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

    queryTrajectoriesButton.addEventListener("click", function () {
        const startTimeValue = formatDateForBackend(startTimePicker.value);
        const endTimeValue = formatDateForBackend(endTimePicker.value);
        //const licensePlates = licensePlatesInput.value.split(',').map(plate => plate.trim());
        const licensePlates = licensePlatesInput.value.trim();

        const params = {
            begin: startTimeValue,
            end: endTimeValue,
            car_id: licensePlates
        };

        axios.post('http://106.52.17.197:5000/vehicle_track', params)
            .then(response => {
                showTrajectories(response.data);
            })
            .catch(error => {
                console.error('Error querying trajectories:', error);
            });
    });
    function formatDateForBackend(dateString) {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

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
                        alert(`车牌号 ${flow.car_id} 的轨迹呈现完毕`);
                    }, 3000);
                    return;
                }

                const sourceNode = data.nodes.find(n => n.id === flow.nodes[index]);
                const targetNode = data.nodes.find(n => n.id === flow.nodes[index + 1]);

                if (sourceNode && targetNode) {
                    const path = svg.append("line")
                        .attr("class", "flow-path")
                        .attr("stroke", flow.color)
                        .attr("x1", sourceNode.x)
                        .attr("y1", sourceNode.y)
                        .attr("x2", sourceNode.x)
                        .attr("y2", sourceNode.y)
                        .attr("marker-end", "url(#arrow)");

                    paths.push({ path, source: sourceNode, target: targetNode });

                    const label = svg.append("text")
                        .attr("class", "label")
                        .text(flow.car_id);

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

});