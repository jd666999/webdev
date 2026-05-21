import { assertEquals, assertStringIncludes } from "jsr:@std/assert";
import { myInterestsView } from "../../app/views/interest.js";

Deno.test("myInterestsView: shows empty state when no interests", () => {
    const html = myInterestsView({ interests: [] });
    assertStringIncludes(html, "no registered interests");
    assertStringIncludes(html, 'href="/programmes"');
});

Deno.test("myInterestsView: renders a list item per interest", () => {
    const interests = [
        { programmeId: 1, title: "Computer Science" },
        { programmeId: 2, title: "Cyber Security" },
    ];
    const html = myInterestsView({ interests });
    assertStringIncludes(html, 'href="/programmes/1"');
    assertStringIncludes(html, "Computer Science");
    assertStringIncludes(html, 'href="/programmes/2"');
    assertStringIncludes(html, "Cyber Security");
});

Deno.test("myInterestsView: each item has a withdraw button with data-programme-id", () => {
    const interests = [{ programmeId: 42, title: "Physics" }];
    const html = myInterestsView({ interests });
    assertStringIncludes(html, 'data-programme-id="42"');
    assertStringIncludes(html, "Withdraw");
});

Deno.test("myInterestsView: escapes special characters in title", () => {
    const interests = [{ programmeId: 3, title: '<script>alert("xss")</script>' }];
    const html = myInterestsView({ interests });
    // Should NOT contain unescaped script tag
    assertEquals(html.includes('<script>alert'), false);
});
