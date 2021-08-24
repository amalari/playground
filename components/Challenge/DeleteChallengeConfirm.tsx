import { useMutation } from '@apollo/client'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Dialog from 'react-bootstrap-dialog'
import { DELETE_CHALLENGE_MUTATION } from './challengeGql'

const DeleteChallengeConfirm = ({ onFinish, id }, ref) => {
    const [dialog, setDialog] = useState(null)
    const [deleteChallenge, {data, loading, error, }] = useMutation(DELETE_CHALLENGE_MUTATION, {
        onCompleted: () => {
            onFinish()
        }
    })

    useImperativeHandle(ref, () => ({
        confirm: () => {
            dialog.show({
                title: 'Delete Confirmation',
                body: 'Are you sure want to delete this challenge?',
                actions: [
                    Dialog.CancelAction(),
                    Dialog.DefaultAction(
                        'Remove',
                        async () => {
                            await deleteChallenge({variables: {id}})
                        },
                        'btn-danger'
                    )
                ],
                onHide: (dialog) => {
                    dialog.hide()
                }
            })
        }
      })
    );

    return (
        <Dialog ref={(component) => setDialog(component) } />
    )
}

export default forwardRef(DeleteChallengeConfirm)