using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    [Header("Movement Settings")]
    public float walkSpeed = 5f;
    public float sprintSpeed = 8f;
    public float jumpForce = 5f;
    public float groundDrag = 4f;

    private Rigidbody rb;
    private bool isGrounded;

    public PlayerState currentState = PlayerState.Walking;
    private GroundChecker groundChecker;

    public Transform cameraTransform;

    private void Awake()
    {
        rb = GetComponent<Rigidbody>();
        cameraTransform = Camera.main.transform;
        groundChecker = GetComponent<GroundChecker>();  // Get the GroundChecker component
    }

    private void Update()
    {
        isGrounded = groundChecker.GetGroundedStatus();  // Get the grounded status from GroundChecker

        // If the player was jumping and now is grounded, change state to walking
        if (isGrounded && currentState == PlayerState.InAir)
        {
            currentState = PlayerState.Walking;  // Transition back to walking when grounded
        }

        // Update movement based on the current state
        UpdateMovement(Time.deltaTime);
    }

    public void SetCurrentState(PlayerState newState)
    {
        currentState = newState;  // Set the state from PlayerStateHolder
    }

    public void UpdateMovement(float deltaTime)
    {
        Vector2 input = new Vector2(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical")).normalized;

        // Move player based on current state
        switch (currentState)
        {
            case PlayerState.Walking:
                HandleWalking(input, deltaTime);
                break;
            case PlayerState.Sprinting:
                HandleSprinting(input, deltaTime);
                break;
            case PlayerState.Jumping:
                HandleJumping();
                break;
            case PlayerState.InAir:
                HandleWalking(input, deltaTime);  // Allow full control while in air
                break;
        }
    }

    private void HandleWalking(Vector2 input, float deltaTime)
    {
        float speed = walkSpeed;
        MovePlayer(input, speed, deltaTime);
    }

    private void HandleSprinting(Vector2 input, float deltaTime)
    {
        float speed = sprintSpeed;
        MovePlayer(input, speed, deltaTime);
    }

    private void HandleJumping()
    {
        if (isGrounded)
        {
            Jump();
        }
    }

    private void MovePlayer(Vector2 input, float speed, float deltaTime)
    {
        Vector3 forward = cameraTransform.forward;
        forward.y = 0f;
        forward.Normalize();

        Vector3 right = cameraTransform.right;
        right.y = 0f;
        right.Normalize();

        Vector3 direction = forward * input.y + right * input.x;

        Vector3 targetVelocity = direction * speed;

        rb.velocity = new Vector3(targetVelocity.x, rb.velocity.y, targetVelocity.z);

        rb.drag = isGrounded ? groundDrag : 0;
    }

    private void Jump()
    {
        if (isGrounded)
        {
            rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
            currentState = PlayerState.InAir;
        }
    }
}
