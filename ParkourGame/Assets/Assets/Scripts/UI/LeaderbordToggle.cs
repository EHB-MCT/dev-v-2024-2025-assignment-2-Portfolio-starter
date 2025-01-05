using UnityEngine;

public class LeaderboardToggle : MonoBehaviour
{
    public GameObject leaderboardPanel;

    private void Start()
    {
        leaderboardPanel.SetActive(false);
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.Tab))
        {
            leaderboardPanel.SetActive(!leaderboardPanel.activeSelf);
        }
    }
}
