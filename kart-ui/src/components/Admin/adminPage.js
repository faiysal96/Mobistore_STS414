

import React, { useState } from "react";
import {
    Grid,
    LinearProgress,
    Select,
    OutlinedInput,
    MenuItem,
    Button
  } from "@material-ui/core";

import PageTitle from "../../components/PageTitle";


export default function Admin(props) {

    return  <PageTitle title="Admin page" button={<Button
        variant="contained"
        size="medium"
        color="secondary"
      >
          Latest Orders
      </Button>} />
}
