import React from "react";

import EntryForm from "./EntryForm";

function Login({ title, formName, buttonName, onSubmit, isOpen, isLoading }) {
  return (
    <div className="entry-container content">
      <EntryForm
        isOpen={isOpen}
        onSubmit={onSubmit}
        title={title}
        formName={formName}
        buttonName={buttonName}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Login;
