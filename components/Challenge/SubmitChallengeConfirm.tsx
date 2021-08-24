import { useMutation } from '@apollo/client'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Dialog from 'react-bootstrap-dialog'
import { SUBMIT_CHALLENGE_MUTATION } from './challengeGql'

const SubmitChallengeConfirm = ({ onFinish, id }, ref) => {
    const [dialog, setDialog] = useState(null)
    const [submitChallenge, {data, loading, error, }] = useMutation(SUBMIT_CHALLENGE_MUTATION, {
        onCompleted: () => {
            onFinish()
        }
    })

    useImperativeHandle(ref, () => ({
        confirm: () => {
            dialog.show({
                title: 'Confirmation',
                body: 'Are you sure want to submit this challenge?',
                actions: [
                    Dialog.CancelAction(),
                    Dialog.DefaultAction(
                        'Submit',
                        async () => {
                            await submitChallenge({variables: {id: String(id)}})
                        },
                        'btn-primary'
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

export default forwardRef(SubmitChallengeConfirm)