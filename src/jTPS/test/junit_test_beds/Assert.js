class Assert {

    assertEquals(num1, num2) {
        if (num1 === num2)
            return "true";
        else
            return "false";
    }

    assertTrue(bool) {
        if (bool === true)
            return "true";
        else
            return "false";
    }

    assertFalse(bool) {
        if (bool === false) 
            return "true";
        else
            return "false";
    }
}