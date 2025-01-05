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
        bool isGrounded = groundChecker.GetGroundedStatus();  // Get grounded status from GroundChecker

        // Handle jumping state
        if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
        {
            playerStateMachine.currentState = PlayerState.Jumping;
        }
        // Handle sprinting state
        else if (Input.GetKey(KeyCode.LeftShift) && isGrounded)
        {
            playerStateMachine.currentState = PlayerState.Sprinting;
        }
        // Handle walking and in-air states
        else if (isGrounded)
        {
            playerStateMachine.currentState = PlayerState.Walking;
        }
        else
        {
            playerStateMachine.currentState = PlayerState.InAir;
        }

        // Set the state in PlayerMovement based on currentState
        playerMovement.SetCurrentState(playerStateMachine.currentState);
    }
}
