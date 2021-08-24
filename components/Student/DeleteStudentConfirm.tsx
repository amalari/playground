import { useMutation } from "@apollo/client";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import Dialog from "react-bootstrap-dialog";
import { DELETE_STUDENT_MUTATION } from "./studentGql";

const DeleteStudentConfirm = ({ onFinish, id }, ref) => {
  const [dialog, setDialog] = useState(null);
  const [deleteStudent, { data, loading, error }] = useMutation(
    DELETE_STUDENT_MUTATION,
    {
      onCompleted: () => {
        onFinish();
      },
    }
  );

  useImperativeHandle(ref, () => ({
    confirm: () => {
      dialog.show({
        title: "Delete Confirmation",
        body: "Are you sure want to delete this student?",
        actions: [
          Dialog.CancelAction(),
          Dialog.DefaultAction(
            "Remove",
            async () => {
              await deleteStudent({ variables: { id: String(id) } });
            },
            "btn-danger"
          ),
        ],
        onHide: (dialog) => {
          dialog.hide();
        },
      });
    },
  }));

  return <Dialog ref={(component) => setDialog(component)} />;
};

export default forwardRef(DeleteStudentConfirm);
