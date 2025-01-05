using UnityEngine;

public interface IPlayerCamera
{
    void UpdateCamera(float deltaTime, Vector2 input);
    void HandleRotation(float rotationInputX, float rotationInputY);
}