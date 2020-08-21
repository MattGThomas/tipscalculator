import React, { Component } from "react";
import { MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";

import "./App.css";

class App extends Component {
  state = {
    bill_total: 0,
    tip_percent: 0,
    bill_shares: 1,
    isCalculated: false,
    isOpen: false,

    final_total: 0,
    total_tip: 0,
    tip_per_person: 0,
    bill_per_person: 0,
  };

  calculateTip = (evt) => {
    evt.preventDefault();
    let { bill_total, bill_shares, tip_percent } = this.state;

    // converts bill total to a number instead of leaving it as a string
    bill_total = Number(bill_total);
    let tip_amount = 0;

    // check if an amount for the bill is included
    if (!bill_total) {
      alert("Please enter a bill amount");
    }
    // check if the percent for the tip is selected
    if (!tip_percent) {
      alert("Please select service level");
    }

    // get the tip amount
    tip_amount = bill_total * tip_percent;
    tip_amount = Math.round(tip_amount * 100) / 100;
    // tip_amount = parseFloat(bill_total * tip_percent).toFixed(2);
    console.log(`this is the tip amount: ${tip_amount}`);

    // get the total bill with the tip
    let total = bill_total + tip_amount;
    total = Math.round(total * 100) / 100;
    console.log(`this is the total including the tip ${total}`);

    // get the tip per person total
    let personal_tip = tip_amount / bill_shares;
    personal_tip = Math.round(personal_tip * 100) / 100;

    let personal_total = total / bill_shares;
    personal_total = Math.round(personal_total * 100) / 100;

    this.setState({
      isCalculated: true,
      isOpen: !this.state.isOpen,
      total_tip: tip_amount,
      final_total: total,
      tip_per_person: personal_tip,
      bill_per_person: personal_total,
    });
    console.log(this.state.final_total);
  };

  selectHandler = (evt) => {
    evt.preventDefault();
    this.setState({
      tip_percent: evt.target.value,
    });
  };

  changeHandler = (evt) => {
    let name = evt.target.name;
    let value = evt.target.value;
    evt.preventDefault();
    this.setState({
      [name]: value,
    });
  };
  clickHandler = (evt) => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    // list of possible tip percentages
    let select_values = [0, 0.35, 0.3, 0.25, 0.2, 0.15];
    let {
      total_tip,
      final_total,
      tip_per_person,
      bill_per_person,
    } = this.state;

    return (
      <div className="App">
        <h1 style={{ paddingBottom: "3%" }}>
          <strong>Tip Calculator</strong>
        </h1>

        <form>
          <label className="label">
            What is the total of your bill? <br />
            <strong>$</strong>
            <input
              type="number"
              onChange={this.changeHandler}
              value={this.state.bill_total}
              name="bill_total"
            />
          </label>
          <br />

          <label className="label">
            How was your service? <br />
            <select
              value={this.state.tip_percent}
              onChange={this.selectHandler}
            >
              <option defaultValue={select_values[0]}>
                - Please Select A Value -
              </option>
              <option value={select_values[1]}>Amazing - 35%</option>
              <option value={select_values[2]}>Good - 30%</option>
              <option value={select_values[3]}>Okay - 25%</option>
              <option value={select_values[4]}>Bad - 20%</option>
              <option value={select_values[5]}>Horrendous - 15%</option>
            </select>
          </label>
          <br />

          <label className="label">
            How many people are sharing the bill? <br />
            <input
              type="number"
              name="bill_shares"
              onChange={this.changeHandler}
              value={this.state.bill_shares}
            />
          </label>
          <br />
          <button onClick={this.calculateTip}>Calculate tip</button>
        </form>
        <MDBModal isOpen={this.state.isOpen}>
          <MDBModalHeader className="modal_header" toggle={this.clickHandler}>
            Success!
            {/* <MDBIcon icon="times" onClick={this.clickHandler} /> */}
          </MDBModalHeader>
          <MDBModalBody className="modal_body">
            Here is your tip amount:
            <br />
            <strong>${total_tip}</strong>
            <br />
            Here is your total bill with Tip:
            <br />
            <strong>
              ${final_total} <br />
            </strong>
            Here is the total tip per person:
            <br />
            <strong>${tip_per_person}</strong>
            <br />
            Here is your total per person (includes tip):
            <br />
            <strong>${bill_per_person}</strong>
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

export default App;
