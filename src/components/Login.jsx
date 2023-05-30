import React from "react";

import EntryForm from "./EntryForm";

function Login({ title, formName, buttonName, onSubmit, isOpen }) {
  return (
    <div className="entry-container content">
      <EntryForm
        isOpen={isOpen}
        onSubmit={onSubmit}
        title={title}
        formName={formName}
        buttonName={buttonName}
      />
    </div>
  );
}

export default Login;
