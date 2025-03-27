let img_slider;
let img_led;
let assembly_image;
var led_color;
let power = false;
let current_ele;
let l_ele;
let x_ele;
var chart;
function activity3() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    add_offcanvas_table(pp);
    pp.showtitle(`<p id="exp-title" style='width: 23vw;'>To determine the divergence of Given Laser Beam</span><p>`, 3);
    pp.showdescription(`<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: 14px;">- Click the start button. <br> - start with x = 10 and d = 0. <br> - Vary the d step by step step <br> - Take the reading when maxima occurs by pressing record observation button <br> - After entering values in observation table for first row increase x by 10 <br> - Take readings for x = 10, 20, 30, 40 and 50. <br> <span style='color: red;'> Note: Record Obeservtion button will be enabled near maxima only. Keep changing d unless it is green. </span> </div>`, 3);
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight3'));
    bsOffcanvas.show();
    let left_panel_text = `
		<canvas id='gauss-plot' style='position: absolute; width: 28vw !important; right:7vw; top: 5vw;'></canvas>

         <div id='act3-left-content' style="position: absolute; font-size: 1.6vw;">


			<div style='width: 80vw; display: flex; flex-direction: row; justify-content: space-evenly;'>

				<div>
					<input type='button' value='Start' id='power-dsp' onclick='power_button();' class='btn btn-danger' />
				</div>


				<div style='width: 30vw; text-align: left;'>
					<img src='./images/components/micrometer.webp' style='position: absolute; width: 30vw; left: 30vw;' />
					<input type='text' id='i-dsp' class='btn btn-dark' style='position: absolute; width: 10vw !important; top: 5.20vw; left: 35.8vw; background: transparent; color: white; border: none; font-size: 1.4vw;' />
					<input type='text' id='l-dsp' class='btn btn-dark' style='position: absolute; width: 10vw !important; top: 5.20vw; left: 48vw; background: transparent; color: white; border: none; font-size: 1.4vw;' />
				</div>


			</div>

			<div style='display: flex; flex-direction: row; justify-content: space-between;' >

				<div style='padding-left: 20%;'> 
					<button onclick='d_inc();' id='d-inc' ><i class="bi bi-caret-up-fill"></i></button> <br>
					d <br>
					<button onclick='d_dec();' id='d-dec'><i class="bi bi-caret-down-fill"></i></button>
				</div>

				

			</div>

			<div display: flex; flex-direction: row;>

			   <div style='position:relative; left: 20vw; top: 2vw;'><img src='./images/components/photo_detector.webp' style=' width: 3vw; height: 2.5vw; ' /></div>

				<div><img src='./images/components/laser.webp' id='laser-img' style='width: 25vw; height: 2.5vw; margin-left: 30vw;' /></div>
			</div>


			<div>
				<img src='./images/components/optical_bench.webp' style='position: relative; width: 70vw; height: 2vw; margin-left: 10vw; top: 1vw;' />
			</div>


			<div>
				<img src='./images/components/scale.webp' style='width: 35vw; height: 2vw; margin-left: 50vw;' />
			</div>
           

			<div style='text-align: center; display: flex; flex-direction: row; text-align: center; justify-content: space-between;' >

				<div ><span style='font-size: 1.5vw;' >$$ \\theta = \\tan^{-1} \\left( \\frac{d_2 - d_1}{x_2 - x_1} \\right) $$</span> </div>

				<div style='text-align: center;' >
				<button class='btn btn-secondary' id='record-btn' disabled onclick='record_observation();' >Record Observation</button> 
				</div>


				<div>
					<span><button onclick='x_dec();' id='i-inc' ><i class="bi bi-caret-left-fill"></i></button></span>X<span><button onclick='x_inc();' id='i-dec' ><i class="bi bi-caret-right-fill"></i></button></span> <br>
					<span id='x-dsp'>X = ${x} cm</span>
				</div>


			</div>

			

         </div>
     `;
    pp.addtoleftpannel(left_panel_text);
    //define the canvas
    pp.addcanvas('mycanvas');
    // pp.addtorightpannel(question_div_box, 3);
    pp.showscore(0, 3);
    canvas = pp.canvas;
    context = canvas.getContext('2d');
    // add rect and scene
    canvas.style.cursor = 'crosshair';
    rect = canvas.getBoundingClientRect();
    //scene = new Scene();
    // assembly_image = new Chemistry.Custome_image(
    // 	assembly,
    // 	new Chemistry.Point(1050, 450),
    // 	815 * 1.3,
    // 	635 * 1.3,
    // 	canvas
    // );
    // img_slider = new Chemistry.Custome_image(
    // 	rheostat_slider,
    // 	new Chemistry.Point(1210, 800),
    // 	41,
    // 	74,
    // 	canvas
    // );
    // scene.add(assembly_image);
    // scene.add(img_slider);
    // add canvas sizing
    window.onload = a2_windowresize;
    window.onresize = a2_windowresize;
    a2_windowresize();
    //load_colors();
    //process_curve_data(0);
    window.addEventListener('click', (event) => a3_mouseclick(event));
    MathJax.typeset();
}
function a3_mouseclick(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
}
function a2_windowresize() {
    //canvas size
    a2_canvas_size();
    //canvas mapping
    a2_canvas_mapping();
    //draw scene
    //scene.draw();
}
// function start_with_key() {
// 	assembly_image.img = assembly2;
// 	scene.draw();
// 	let ele: HTMLSelectElement = <HTMLSelectElement>(
// 		document.getElementById('set-lambda')
// 	);
// 	let ele2: HTMLInputElement = <HTMLInputElement>(
// 		document.getElementById('d-inp')
// 	);
// 	ele.disabled = false;
// 	ele2.disabled = false;
// 	let btn = document.getElementById('act31-btn');
// 	btn.remove();
// }
function a2_canvas_size() {
    canvas.width = window.innerWidth * 0.91;
    canvas.height = ((canvas.width * 1080.0) / 1920) * 0.85;
    lscale = canvas.width / 1920.0;
    document.getElementById('leftpannel').style.height =
        canvas.height + 5 + 'px';
    document.getElementById('leftpannel').style.margin = '0';
}
function a2_canvas_mapping() {
    context.translate(0, canvas.height);
    context.scale(1, -1);
}
function add_offcanvas_table(x) {
    x.addoffcanvas(4);
    let bsOffcanvas4 = document.getElementById('offcanvasRight4');
    let pn = document.getElementById('pannel4');
    let btn1 = document.getElementsByClassName('offcanvasbtn')[1];
    //bsOffcanvas.show();
    //bsOffcanvas4.style.position = 'relative';
    btn1.style.top = '85px';
    bsOffcanvas4.style.width = '50vw';
    pn.style.height = '30vh';
    let ele = document.getElementsByClassName('bi bi-arrow-bar-left offcanvasicon')[1];
    ele.className = 'bi bi-table offcanvasicon';
    x.showdescription(`<p id='exp-title' style='margin: auto; width: 95%;'>Observation Table</span><p>`, 4);
    x.addtorightpannel(`<div id='obst' ></div>`, 4);
    //add table here
    let header = [`Sr no.`, `Distance between <br> laser and detector <br> (x)`, `Maximum <br> Current`, `d value <br> at maximum <br> current`, `Calculated <br> values of <br> &theta;`];
    let parent = document.getElementById('obst');
    let tab = new Verify_Rows_Cols_Custom_Fixed_Update1(header, observation_table, [0], [[4]], '', parent, true, true, () => { }, 5);
    tab.load_table();
}
function power_button() {
    let btn = document.getElementById('power-dsp');
    current_ele = document.getElementById('i-dsp');
    l_ele = document.getElementById('l-dsp');
    x_ele = document.getElementById('x-dsp');
    if (power) {
        power = false;
        btn.className = 'btn btn-danger';
        btn.value = 'Power On';
        current_ele.value = '';
        l_ele.value = '';
    }
    else {
        power = true;
        btn.className = 'btn btn-primary';
        btn.value = 'Power OFF';
        current_ele.value = (current * (1 + (Math.random() / 100))).toFixed(3);
        l_ele.value = d.toFixed(3);
    }
}
// to increase d value
function d_inc() {
    if (d < 0.206) {
        d += 0.001;
        d = parseFloat(d.toFixed(3));
        console.log(d);
        for (let i = 0; i < exp_data.length; i++) {
            let st = x.toString();
            if (exp_data[i]['d'] == d) {
                current = exp_data[i][st];
                check_maxima();
                break;
            }
        }
        current_ele.value = (current * (1 + (Math.random() / 100))).toFixed(3);
        l_ele.value = d.toFixed(3);
    }
    else {
        alert('You have reached to the  maximum value of d');
    }
}
// to decrease d value
function d_dec() {
    if (d > 0.000) {
        d -= 0.001;
        d = parseFloat(d.toFixed(3));
        for (let i = 0; i < exp_data.length; i++) {
            if (exp_data[i]['d'] == d) {
                let st = x.toString();
                current = exp_data[i][st];
                check_maxima();
                break;
            }
        }
        current_ele.value = (current * (1 + (Math.random() / 100))).toFixed(3);
        l_ele.value = d.toFixed(3);
    }
    else {
        alert('You have reached to the minimum value of d');
    }
}
// to increase x value
function x_inc() {
    let laser_ele = document.getElementById('laser-img');
    if (x < 50) {
        x += 10;
        for (let i = 0; i < exp_data.length; i++) {
            if (exp_data[i]['d'] == d) {
                let st = x.toString();
                current = exp_data[i][st];
                check_maxima();
                break;
            }
        }
        current_ele.value = (current * (1 + (Math.random() / 100))).toFixed(3);
        x_ele.innerText = x.toString() + ' cm';
        laser_ele.style.marginLeft = `${30 + 20 * (x / 50)}vw`;
    }
    else {
        alert('You have reached to the  maximum value of x');
    }
}
// to decrease x value
function x_dec() {
    let laser_ele = document.getElementById('laser-img');
    if (x > 10) {
        x -= 10;
        for (let i = 0; i < exp_data.length; i++) {
            if (exp_data[i]['d'] == d) {
                let st = x.toString();
                current = exp_data[i][st];
                check_maxima();
                break;
            }
        }
        current_ele.value = (current * (1 + (Math.random() / 100))).toFixed(3);
        x_ele.innerText = x.toString() + ' cm';
        laser_ele.style.marginLeft = `${30 + 20 * (x / 50)}vw`;
    }
    else {
        alert('You have reached to the minimum value of x');
    }
}
function check_maxima() {
    let btn = document.getElementById('record-btn');
    let res = undefined;
    //process_curve_data(x);
    for (let i = 0; i < exp_data.length; i++) {
        if (exp_data[i]['d'] == d) {
            if (exp_data[i]['max'] && exp_data[i]['max'] == x.toString()) {
                res = exp_data[i]['max'];
                btn.className = 'btn btn-success';
                btn.disabled = false;
                break;
            }
        }
    }
    if (!res) {
        btn.className = 'btn btn-secondary';
        btn.disabled = true;
    }
}
function record_observation() {
    let new_row = [];
    //to avoid duplicate entries;
    for (let i = 0; i < observation_table.length; i++) {
        if (observation_table[i][1] == x) {
            alert(`You have already entered observation for x = ${x} cm`);
            return;
        }
    }
    // to only allow incremental 5 observations
    if (observation_table.length > 0) {
        if (x != (observation_table[observation_table.length - 1][1] + 10)) {
            alert(`You need to take observation for x = ${observation_table[observation_table.length - 1][1] + 10}cm first.`);
            return;
        }
    }
    else {
        if (x != 10) {
            alert('Start taking observation from X = 10cm');
            return;
        }
    }
    disable_buttons();
    //to add values in observation table
    let header = [`Sr no.`, `Distance between <br> laser and detector <br> (x)`, `Maximum <br> Current`, `d value <br> at maximum <br> current`, `Calculated <br> values of <br> &theta;`];
    new_row.push(observation_table.length + 1);
    new_row.push(x);
    new_row.push(current);
    new_row.push(parseFloat(d.toFixed(3)));
    new_row.push(parseFloat((Math.atan((d - d1) / (x - x1)).toFixed(7))));
    observation_table.push(new_row);
    let parent = document.getElementById('obst');
    parent.innerHTML = ``;
    let tab = new Verify_Rows_Cols_Custom_Fixed_Update1(header, observation_table, [observation_table.length - 1], [[4]], '', parent, true, true, verification_sucessful, 6);
    tab.load_table();
    x1 = observation_table[observation_table.length - 1][1];
    d1 = observation_table[observation_table.length - 1][3];
    if (observation_table.length >= 5) {
        process_curve_data(9);
    }
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight4'));
    bsOffcanvas.show();
}
function verification_sucessful() {
    alert('You have entered correct value');
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight4'));
    bsOffcanvas.hide();
    enable_buttons();
    let btn = document.getElementById('record-btn');
    btn.disabled = true;
    btn.className = 'btn btn-secondary';
}
//function to disable buttons while adding new observation
function disable_buttons() {
    let btn1 = document.getElementById('d-inc');
    let btn2 = document.getElementById('d-dec');
    let btn3 = document.getElementById('i-inc');
    let btn4 = document.getElementById('i-dec');
    let btn = document.getElementById('record-btn');
    btn1.disabled = true;
    btn2.disabled = true;
    btn3.disabled = true;
    btn4.disabled = true;
    btn.disabled = true;
}
//function to disable buttons after adding new observation
function enable_buttons() {
    let btn1 = document.getElementById('d-inc');
    let btn2 = document.getElementById('d-dec');
    let btn3 = document.getElementById('i-inc');
    let btn4 = document.getElementById('i-dec');
    let btn = document.getElementById('record-btn');
    btn1.disabled = false;
    btn2.disabled = false;
    btn3.disabled = false;
    btn4.disabled = false;
    btn.disabled = false;
}
function process_curve_data(std_deviation) {
    let mean = 0;
    let x_values = [];
    let y_values = [];
    for (let i = 0; i < 41; i++) {
        y_values.push(gauss_distribution(i, std_deviation, 20));
        x_values.push(i);
    }
    plot_gauss(x_values, y_values);
}
function gauss_distribution(x, std_deviation, mean) {
    let y = 0;
    y = Math.pow(Math.E, -(1 / 2) * (Math.pow((x - mean) / std_deviation, 2))) / (std_deviation * Math.sqrt(2 * Math.PI));
    return y;
}
function plot_gauss(x_values, y_values) {
    // root.id = "act8";
    var ctx = document.getElementById('gauss-plot');
    ctx.style.backgroundColor = "white";
    ctx.style.marginTop = "5px";
    ctx.style.marginLeft = "10%";
    ctx.style.padding = "10px";
    ctx.style.borderRadius = "8px";
    if (typeof chart != 'undefined') {
        chart.destroy();
    }
    // let labels = [0.004, 0.007, 0.010, 0.014, 0.020, 0.029, 0.039];
    // let data1=[82.28,96.86,104.07,108.28,112.48,117.68,125.35];//hi_expt
    // let data2=[146.90,183.50,204.11,230.09,256.89,290.83,323.49];//hi_st
    chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: x_values,
            datasets: [
                {
                    label: 'Experimental',
                    data: y_values,
                    fill: false,
                    borderColor: 'blue',
                    tension: 0.2,
                    showLine: true
                    // yAxisID: 'A',
                    // borderWidth: 1,
                    // borderColor: "green",
                    // backgroundColor: "rgba(34, 139, 34, 0.5)",
                }
            ]
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Y',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'X',
                        font: { size: 14, weight: 'bold' }
                    }
                }
            },
            responsive: false,
        }
    });
}
// activity3();
//# sourceMappingURL=activity3.js.map