import React from 'react';
import AdminCode from '../../component/Admin/AdminCode';
import AdminTeams from '../../component/Admin/AdminTeams';
import TeamStatus from '../../component/Team/TeamStatus';

/* openTab()
 * This function handles showing / hiding tab content on the admin page based on
 * click events.
 *
 */
function openTab(event) {
	const tabName = event.target.id;
	const tabCName = tabName.replace('tab', 'tabC');
	const classTabShow = 'nav-link active';
	const classTabHide = 'nav-link';
	const classTabCShow = 'tab-pane fade show active';
	const classTabCHide = 'tab-pane fade';
	var i;
	var x = document.getElementsByClassName('nav-link');
	var y = document.getElementsByClassName('tab-pane');
	console.log(`[${tabName}][${tabCName}]`);
	for (i = 0; i < x.length; i++) {
		x[i].className = (x[i].id === tabName) ? classTabShow: classTabHide;
	}
	for (i = 0; i < y.length; i++) {
		y[i].className = (y[i].id === tabCName) ? classTabCShow: classTabCHide;
	}
}

/* Admin
 * This component is a simple tab framework allowing the admin to tab between administrative
 * functions.
 *
 */
const Admin = () => (
	<div className="bs-docs-section">
		<div className="row"><div className="page-header"><h2>Admin Page</h2></div></div>
		<div className="row"><div className="col-sm-10"><TeamStatus /></div></div>
		<div className="row">
			<div className="col-lg-12">
				<div className="bs-component">
					<ul class="nav nav-pills">
						<li class="nav-item">
							<a id="tabHome" class="nav-link active" data-toggle="tab" href="#home" onClick={openTab}>Home</a>
						</li>
						<li class="nav-item">
							<a id="tabTeams" class="nav-link" data-toggle="tab" href="#profile" onClick={openTab}>Teams</a>
						</li>
						<li class="nav-item">
							<a id="tabMaint" class="nav-link" href="#" onClick={openTab}>Maint</a>
						</li>
					</ul>
					<div id="myTabContent" class="tab-content">
						<div id="tabCHome" class="tab-pane fade show active">
							<AdminCode />
						</div>
						<div id="tabCTeams" class="tab-pane fade">
							<AdminTeams />
						</div>
						<div id="tabCMaint" class="tab-pane fade">
							<p>Hey You</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	

);
export default Admin;