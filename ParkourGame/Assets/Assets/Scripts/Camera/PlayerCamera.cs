using UnityEngine;

public class PlayerCamera : MonoBehaviour, IPlayerCamera
{
    [Header("Camera Settings")]
    public float rotationSpeed = 2.0f;
    public float minVerticalAngle = -45f;
    public float maxVerticalAngle = 80f;

    private Vector2 currentRotation = Vector2.zero;

    private void Start()
    {
        Cursor.lockState = CursorLockMode.Locked;
        Cursor.visible = false;
    }

    private void Update()
    {
        Vector2 input = new Vector2(
            Input.GetAxis("Mouse X"),
            Input.GetAxis("Mouse Y")
        );

        UpdateCamera(Time.deltaTime, input);
    }

    public void UpdateCamera(float deltaTime, Vector2 input)
    {
        HandleRotation(input.x, input.y);
    }

    public void HandleRotation(float rotationInputX, float rotationInputY)
    {
        currentRotation.x += rotationInputX * rotationSpeed;

        currentRotation.y -= rotationInputY * rotationSpeed;
        currentRotation.y = Mathf.Clamp(currentRotation.y, minVerticalAngle, maxVerticalAngle);

        transform.eulerAngles = new Vector3(currentRotation.y, currentRotation.x, 0);
    }
}
