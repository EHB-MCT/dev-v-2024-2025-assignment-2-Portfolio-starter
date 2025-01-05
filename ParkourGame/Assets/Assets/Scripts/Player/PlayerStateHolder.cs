using UnityEngine;

public class PlayerStateHolder : MonoBehaviour
{
    private PlayerStateMachine playerStateMachine;
    private PlayerMovement playerMovement;
    private GroundChecker groundChecker;

    private void Awake()
    {
        playerStateMachine = GetComponent<PlayerStateMachine>();
        playerMovement = GetComponent<PlayerMovement>();
        groundChecker = GetComponent<GroundChecker>();
    }

    private void Update()
    {
        HandleStateTransitions();
    }

    private void HandleStateTransitions()
    {
        bool isGrounded = groundChecker.GetGroundedStatus();

        if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
        {
            playerStateMachine.currentState = PlayerState.Jumping;
        }
        else if (Input.GetKey(KeyCode.LeftShift) && isGrounded)
        {
            playerStateMachine.currentState = PlayerState.Sprinting;
        }
        else if (isGrounded)
        {
            playerStateMachine.currentState = PlayerState.Walking;
        }
        else
        {
            playerStateMachine.currentState = PlayerState.InAir;
        }

        playerMovement.SetCurrentState(playerStateMachine.currentState);
    }
}
